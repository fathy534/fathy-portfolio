
const intro = document.getElementById("intro");

window.addEventListener("load", () => {
  setTimeout(() => intro?.classList.add("hide"), 2200);
});

// Star background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeStars() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  stars = Array.from({
    length: Math.min(180, Math.floor(window.innerWidth / 5))
  }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5 + .3,
    opacity: Math.random(),
    speed: Math.random() * .008 + .002
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach(star => {
    star.opacity += star.speed;

    if (star.opacity > 1 || star.opacity < .15) {
      star.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,225,180,${star.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

resizeStars();
drawStars();
window.addEventListener("resize", resizeStars);

// Language
const languageBtn = document.getElementById("languageBtn");
let currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

function setLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach(element => {
    element.textContent = element.dataset[language];
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach(element => {
    element.placeholder = element.dataset[
      language === "ar" ? "placeholderAr" : "placeholderEn"
    ];
  });

  languageBtn.textContent = language === "en" ? "AR" : "EN";
  localStorage.setItem("portfolioLanguage", language);
}

languageBtn.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "ar" : "en");
});

setLanguage(currentLanguage);

// Theme
const themeBtn = document.getElementById("themeBtn");
let savedTheme = localStorage.getItem("portfolioTheme") || "dark";

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeBtn.textContent = theme === "light" ? "☾" : "☀";
  localStorage.setItem("portfolioTheme", theme);
}

themeBtn.addEventListener("click", () => {
  savedTheme = savedTheme === "dark" ? "light" : "dark";
  setTheme(savedTheme);
});

setTheme(savedTheme);

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Back to top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepare an email
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("visitorPhone").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const subject = document.getElementById("messageSubject").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  const emailBody =
`Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}

Message:
${message}`;

  const mailtoLink =
    `mailto:kingfathy850@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoLink;
});
