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
langBtn.textContent = savedLang === 'en' ? '🌐 ES' : '🌐 EN';

langBtn.addEventListener('click', () => {
  const cur  = root.getAttribute('data-lang');
  const next = cur === 'en' ? 'es' : 'en';
  root.setAttribute('data-lang', next);
  localStorage.setItem('nc-lang', next);
  langBtn.textContent = next === 'en' ? '🌐 ES' : '🌐 EN';
});

// ── Hero nav: bottom when hero visible, top when scrolled past ──
(function() {
  const heroEl = document.getElementById('hero');
  function checkHero() {
    const bottom = heroEl.getBoundingClientRect().bottom;
    document.body.classList.toggle('past-hero', bottom < 80);
  }
  window.addEventListener('scroll', checkHero, { passive: true });
  checkHero();
})();

// ── Hero → WHO auto-scroll (only this transition) ──
(function() {
  const hero = document.getElementById('hero');
  const who  = document.getElementById('who');
  let triggered = false;

  const obs = new IntersectionObserver(([entry]) => {
    if (!triggered && !entry.isIntersecting && entry.boundingClientRect.top < 0) {
      triggered = true;
      who.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { triggered = false; }, 1200);
    }
  }, { threshold: 0.10 });

  obs.observe(hero);
})();

// ── Feria tabs ──
function switchTab(id) {
  document.querySelectorAll('.feria-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.feria-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}
