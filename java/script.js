const themes = ['dark', 'light'];
let currentTheme = 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cod-mw-theme', theme);
  currentTheme = theme;
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);

  const btn = document.getElementById('themeToggle');
  btn.style.transform = 'rotate(360deg)';
  setTimeout(() => { btn.style.transform = ''; }, 400);
}

function loadSavedTheme() {
  const saved = localStorage.getItem('cod-mw-theme');
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedTheme();

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
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
