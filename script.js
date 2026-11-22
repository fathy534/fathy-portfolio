
// INTRO SCREEN
window.addEventListener("load", () => {
  const intro = document.getElementById("introScreen");

  setTimeout(() => {
    if (intro) {
      intro.classList.add("hide");
    }
  }, 2200);
});


// STAR BACKGROUND
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = canvasWidth * pixelRatio;
  canvas.height = canvasHeight * pixelRatio;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  stars = [];

  const numberOfStars = Math.min(
    Math.floor((canvasWidth * canvasHeight) / 5500),
    220
  );

  for (let i = 0; i < numberOfStars; i++) {
    stars.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  stars.forEach((star) => {
    star.phase += star.speed;

    const opacity =
      star.opacity * (0.65 + Math.sin(star.phase) * 0.35);

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 235, 195, ${opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();

window.addEventListener("resize", resizeCanvas);


// LANGUAGE SWITCH
const languageBtn = document.getElementById("languageBtn");

let currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

function setLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.body.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    const value = element.getAttribute(`data-${language}`);

    if (value !== null) {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach((element) => {
    const value = element.getAttribute(`data-placeholder-${language}`);

    if (value !== null) {
      element.placeholder = value;
    }
  });

  languageBtn.textContent = language === "en" ? "AR" : "EN";

  localStorage.setItem("portfolioLanguage", language);
}

languageBtn.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "en" ? "ar" : "en";
  setLanguage(nextLanguage);
});

setLanguage(currentLanguage);


// THEME SWITCH
const themeBtn = document.getElementById("themeBtn");

let currentTheme = localStorage.getItem("portfolioTheme") || "dark";

function setTheme(theme) {
  currentTheme = theme;

  if (theme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☾";
  } else {
    document.body.classList.remove("light");
    themeBtn.textContent = "☀";
  }

  localStorage.setItem("portfolioTheme", theme);
}

themeBtn.addEventListener("click", () => {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

setTheme(currentTheme);


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});


// SCROLL REVEAL
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


// BACK TO TOP
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// CURRENT YEAR
document.getElementById("year").textContent = new Date().getFullYear();


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("senderName").value.trim();
  const fullName = document.getElementById("senderFullName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const phone = document.getElementById("senderPhone").value.trim();
  const subject = document.getElementById("senderSubject").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  if (!name || !fullName || !email || !subject || !message) {
    alert(
      currentLanguage === "ar"
        ? "من فضلك املأ كل البيانات المطلوبة."
        : "Please fill in all required fields."
    );
    return;
  }

  const body = `
Name: ${name}
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

Message:
${message}
  `;

  const mailtoLink =
    `mailto:kingfathy850@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
});
