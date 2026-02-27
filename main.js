const root = document.documentElement;

// ── Theme toggle ──
const themeBtn = document.getElementById('theme-btn');
const savedTheme = localStorage.getItem('nc-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☀ Light' : '☾ Dark';

function toggleTheme() {
  const cur  = root.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('nc-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀ Light' : '☾ Dark';
}

// ── Language toggle ──
const langBtn = document.getElementById('lang-btn');
const savedLang = localStorage.getItem('nc-lang') || 'en';
root.setAttribute('data-lang', savedLang);
langBtn.textContent = savedLang === 'en' ? 'ESP' : 'ENG';

langBtn.addEventListener('click', () => {
  const cur  = root.getAttribute('data-lang');
  const next = cur === 'en' ? 'es' : 'en';
  root.setAttribute('data-lang', next);
  localStorage.setItem('nc-lang', next);
  langBtn.textContent = next === 'en' ? 'ESP' : 'ENG';
});

// ── Feria tabs ──
function switchTab(id) {
  document.querySelectorAll('.feria-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.feria-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}
