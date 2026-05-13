toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  const spans = toggle.querySelectorAll("span");
  if (open) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  }
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    const spans = toggle.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  }),
);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector("nav").offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

window.addEventListener(
  "scroll",
  () => {
    document.querySelector("nav").style.boxShadow =
      window.scrollY > 40 ? "0 2px 24px rgba(0,0,0,0.3)" : "none";
  },
  { passive: true },
);

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    const response = document.getElementById("formResponse");
    btn.textContent = "Sending...";
    btn.disabled = true;
    try {
      const res = await fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        btn.textContent = "Enquiry Sent ✓";
        btn.style.background = "#1D6B45";
        response.textContent =
          "Thank you — we'll be in touch within one business day.";
      } else {
        throw new Error("Server responded with " + res.status);
      }
    } catch {
      btn.textContent = "Try Again";
      btn.disabled = false;
      response.textContent =
        "Something went wrong. Please email us directly at info@hsgmglobal.com.";
    }
  });
