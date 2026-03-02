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

// ── Hero: first downward input snaps to #who-header, nav sits above it ──
(function () {
  const nav  = document.querySelector('nav');
  const who  = document.getElementById('who-header');
  let done   = false;

  // Pre-calculate once at load (scrollY = 0, so getBCR().top = document-top)
  const targetY = Math.max(0, who.getBoundingClientRect().top - nav.offsetHeight);

  function snap() {
    if (done) return;
    done = true;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  // Mouse / trackpad wheel — fires before browser moves the page
  window.addEventListener('wheel', function (e) {
    if (e.deltaY > 0 && window.scrollY < 50) snap();
  }, { passive: true });

  // Touch (mobile)
  let startY = 0;
  window.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (startY - e.changedTouches[0].clientY > 20 && window.scrollY < 50) snap();
  }, { passive: true });
})()

// ── Feria tabs ──
function switchTab(id) {
  document.querySelectorAll('.feria-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.feria-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}
