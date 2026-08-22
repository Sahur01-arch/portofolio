import { gsap } from "gsap";
import darkProfile from "./assets-img/profile-dark.jpg";
import lightProfile from "./assets-img/profile-light.jpg";

document.querySelectorAll(".about-box").forEach(box => {
  box.addEventListener("mouseenter", () => {
    gsap.to(box, {y: -6, scale: 1.02, duration: 0.3, ease: "power2.out"});
  });
  box.addEventListener("mouseleave", () => {
    gsap.to(box, {y: 0, scale: 1, duration: 0.3, ease: "power2.out"})
  });
}); 

const toggleBtn = document.querySelector("#theme-toggle");
const photo = document.querySelector(".photo");

const overlay = document.createElement("div");
overlay.classList.add("theme-overlay");
document.body.appendChild(overlay);

const otherSections = document.querySelectorAll(".about, .projects");

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  toggleBtn.textContent = isDark ? "☀️Change Theme" : "🌙 Change Theme";

  const tl = gsap.timeline();

  tl.to(photo, { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in" })
    .add(() => { photo.src = isDark ? darkProfile : lightProfile; })
    .to(photo, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" })
    .to(toggleBtn, { rotation: 360, duration: 0.5, ease: "power2.inOut" }, 0)
    .to(overlay, { opacity: 0.6, duration: 0.25, ease: "power2.in" }, 0)
    .to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.25)
    .fromTo(otherSections,
      { scale: 0.97, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05, clearProps: "all" },
      0.15);

  tl.then(() => gsap.set(toggleBtn, { rotation: 0 }));
})
