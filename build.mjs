/**
 * build.mjs — Nouns Colombia Portfolio Builder
 *
 * Reads .md files from content/projects/, generates artwork-card HTML,
 * and injects it into index.html between PROJECTS:START / PROJECTS:END markers.
 *
 * Usage:
 *   npm run build
 *   node build.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── HTML helpers ──────────────────────────────────────────────────────────
// For attribute values (href, src, alt)
const escAttr = str => String(str)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// For text content (inside tags) — don't escape quotes
const escTxt = str => String(str)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Minimal frontmatter parser ────────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    if (key) data[key] = val;
  }
  return { data, body: match[2].trim() };
}

// ── HTML for one artwork card ─────────────────────────────────────────────
function renderCard({ title, type, image, link, caption_en, caption_es, draft }) {
  if (draft === 'true' || draft === true) return '';

  const mediaHtml  = buildMedia(type, image, title);
  const captionHtml = buildCaption(caption_en, caption_es, title);

  const card = [
    '    <div class="artwork-card">',
    '      <div class="artwork-img">',
    `        ${mediaHtml}`,
    '      </div>',
    '      <div class="artwork-caption">',
    `        ${captionHtml}`,
    '      </div>',
    '    </div>',
  ].join('\n');

  if (link) {
    return [
      `    <a href="${escAttr(link)}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;">`,
      card.replace(/^    /gm, '      '), // indent card one level deeper
      '    </a>',
    ].join('\n') + '\n';
  }
  return card + '\n';
}

function buildMedia(type, image, title) {
  if (!image) return '<span class="ph-icon">⌐◨-◨</span>';

  const alt     = escAttr(title || '');
  const src     = escAttr(image);
  const onerror = `onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"`;

  if (type === 'video') {
    return `<video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;"><source src="${src}"></video>`;
  }

  // image or gif — fallback placeholder on error
  return [
    `<img src="${src}" alt="${alt}" loading="lazy" ${onerror}>`,
    '<span class="ph-icon" style="display:none;">⌐◨-◨</span>',
  ].join('\n        ');
}

function buildCaption(en, es, title) {
  if (!en && !es) return escTxt(title || '');
  if (!es) return escTxt(en);
  if (!en) return escTxt(es);
  return `<span class="t-en">${escTxt(en)}</span><span class="t-es">${escTxt(es)}</span>`;
}

// ── Main ──────────────────────────────────────────────────────────────────
const projectsDir = join(__dir, 'content', 'projects');
const indexPath   = join(__dir, 'index.html');

if (!existsSync(projectsDir)) {
  console.error('ERROR: content/projects/ directory not found.');
  process.exit(1);
}

// Read all .md files, sorted by filename
const files = readdirSync(projectsDir)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort();

const cards = files.map(file => {
  const raw = readFileSync(join(projectsDir, file), 'utf8');
  const { data } = parseFrontmatter(raw);
  return renderCard(data);
}).join('');

// Inject into index.html
let html = readFileSync(indexPath, 'utf8');

const START_MARKER = '<!-- PROJECTS:START -->';
const END_MARKER   = '<!-- PROJECTS:END -->';

const startIdx = html.indexOf(START_MARKER);
const endIdx   = html.indexOf(END_MARKER);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: Could not find PROJECTS:START / PROJECTS:END markers in index.html');
  process.exit(1);
}

const before   = html.slice(0, startIdx + START_MARKER.length);
const after    = html.slice(endIdx);
const injected = `${before}\n${cards}    ${after}`;

writeFileSync(indexPath, injected, 'utf8');

console.log(`✓ Built ${files.length} project cards → index.html`);
files.forEach(f => console.log(`  · ${f}`));
