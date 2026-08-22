// ============================================================
// PORTOFOLIO — Saryu
// Tidak butuh library eksternal (AOS/gsap dilepas dari sini agar
// situs tetap jalan bahkan sebelum `npm install` dijalankan).
// Kalau kamu tetap mau pakai AOS/gsap yang sudah ada di
// package.json, itu bisa diimpor terpisah — lihat catatan di
// README.md bagian "Tentang dependency yang belum dipakai".
// ============================================================

// ---------- 1. Theme toggle (light/dark), tersimpan di memori tab ----------
const THEME_KEY = "theme";
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeToggle.textContent = "☀️ Light";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙 Dark";
  }
}

// Ikuti preferensi sistem sebagai default awal
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(prefersLight ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  applyTheme(isLight ? "dark" : "light");
});

// ---------- 2. Efek ketik di hero (nama muncul seperti diketik di terminal) ----------
const typedEl = document.getElementById("typed-name");
if (typedEl) {
  const fullText = typedEl.dataset.text || typedEl.textContent;
  typedEl.textContent = "";

  let i = 0;
  const typeSpeed = 55;

  function typeNext() {
    if (i <= fullText.length) {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeNext, typeSpeed);
    }
  }

  // Hormati preferensi "reduced motion" — langsung tampilkan teks penuh
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    typedEl.textContent = fullText;
  } else {
    typeNext();
  }
}

// ---------- 3. Scroll reveal sederhana (tanpa dependency AOS) ----------
const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  // Fallback: browser lama, langsung tampilkan semua
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}
