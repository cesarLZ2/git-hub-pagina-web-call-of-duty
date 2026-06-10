const themes = ['dark', 'light', 'military', 'neon'];
let currentThemeIndex = 0;

function getNextTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  return themes[currentThemeIndex];
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cod-mw-theme', theme);
}

function toggleTheme() {
  const next = getNextTheme();
  applyTheme(next);

  const btn = document.getElementById('themeToggle');
  btn.style.transform = 'rotate(360deg)';
  setTimeout(() => { btn.style.transform = ''; }, 400);
}

function loadSavedTheme() {
  const saved = localStorage.getItem('cod-mw-theme');
  if (saved && themes.includes(saved)) {
    currentThemeIndex = themes.indexOf(saved);
    applyTheme(saved);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedTheme();

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();
      if (email) {
        alert(`¡Gracias por suscribirte, ${email}! Recibirás noticias sobre Modern Warfare.`);
        input.value = '';
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
});
