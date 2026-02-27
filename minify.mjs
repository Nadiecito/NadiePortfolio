/**
 * minify.mjs — simple minification for style.css and main.js
 * Run: node minify.mjs
 * Output: style.min.css and main.min.js (for production deployment)
 */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// ── CSS minifier (no deps) ──────────────────────────────────────────
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')         // remove comments
    .replace(/\s+/g, ' ')                      // collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')     // trim around punctuation
    .replace(/;\}/g, '}')                      // remove trailing semicolons
    .replace(/\s*!\s*important/g, '!important')
    .trim();
}

// ── CSS ────────────────────────────────────────────────────────────
const cssIn  = readFileSync('style.css', 'utf8');
const cssOut = minifyCSS(cssIn);
writeFileSync('style.min.css', cssOut);
const cssSave = (((cssIn.length - cssOut.length) / cssIn.length) * 100).toFixed(1);
console.log(`✓ style.min.css  ${cssIn.length} → ${cssOut.length} bytes (−${cssSave}%)`);

// ── JS via terser ──────────────────────────────────────────────────
try {
  execSync('npx terser main.js -o main.min.js --compress --mangle', { stdio: 'pipe' });
  const jsIn  = readFileSync('main.js');
  const jsOut = readFileSync('main.min.js');
  const jsSave = (((jsIn.length - jsOut.length) / jsIn.length) * 100).toFixed(1);
  console.log(`✓ main.min.js    ${jsIn.length} → ${jsOut.length} bytes (−${jsSave}%)`);
} catch (e) {
  console.warn('⚠ terser not available — skipping JS minification');
  console.warn('  Install with: npm install -g terser');
}

console.log('\nDone! Use style.min.css + main.min.js in production.');
console.log('Update index.html links when deploying to production.\n');
