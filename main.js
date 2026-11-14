const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const links = [...nav.querySelectorAll("a")];

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const markCurrent = () => {
  const line = window.scrollY + 140;
  let current = null;
  sections.forEach((section) => {
    if (section.offsetTop <= line) current = section;
  });
  links.forEach((link) => {
    const active = current && link.getAttribute("href") === `#${current.id}`;
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
};

markCurrent();
window.addEventListener("scroll", () => {
  header.classList.toggle("is-stuck", window.scrollY > 8);
  markCurrent();
}, { passive: true });
