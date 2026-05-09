/* ANIMAÇÕES AO ROLAR */
const animatedItems = document.querySelectorAll(".reveal, .contact-form");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.18
});

animatedItems.forEach((item) => observer.observe(item));
