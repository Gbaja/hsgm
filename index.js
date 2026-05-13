document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  // ===== Mobile Nav Toggle =====
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);

      const spans = toggle.querySelectorAll("span");

      if (open) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans.forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      }
    });

    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");

        const spans = toggle.querySelectorAll("span");
        spans.forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      }),
    );
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 0;

      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ===== Nav Shadow on Scroll =====
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.style.boxShadow =
          window.scrollY > 40 ? "0 2px 24px rgba(0,0,0,0.3)" : "none";
      },
      { passive: true },
    );
  }

  // ===== Contact Form =====
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
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
          form.reset();
        } else {
          throw new Error("Server error");
        }
      } catch (err) {
        btn.textContent = "Try Again";
        btn.disabled = false;
        response.textContent =
          "Something went wrong. Please email orders@hsgm.co.uk.";
      }
    });
  }
});
