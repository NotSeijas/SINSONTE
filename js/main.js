/* ════════════════════════════════════════
   SINSONTE — main.js
   Módulos: Loader → Nav → Hero Title →
   Parallax → Partículas → Reveal →
   Counters → Hamburger
════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── LOADER ───────────────────────────── */
  const loader = document.getElementById("loader");
  const loaderCount = document.getElementById("loader-count");

  let progress = 0;
  const ticker = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(ticker);
    }
    loaderCount.textContent = Math.floor(progress) + "%";
  }, 120);

  const hideLoader = () => loader.classList.add("hidden");
  window.addEventListener("load", () => setTimeout(hideLoader, 2200));
  setTimeout(hideLoader, 3500); // fallback

  /* ── HERO TITLE — word-by-word reveal ── */
  const titleEl = document.getElementById("hero-title");
  if (titleEl) {
    const lines = [
      ["El", "primer"],
      ["aperitivo"],
      ["de", "ajíes"],
      ["peruanos"],
    ];
    let delay = 0.5;
    lines.forEach((line, li) => {
      line.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.className = "word";
        const inner = document.createElement("span");
        inner.textContent = word;
        if (word === "ajíes") inner.style.color = "var(--amber)";
        inner.style.animationDelay = delay + "s";
        delay += 0.12;
        wrapper.appendChild(inner);
        titleEl.appendChild(wrapper);
        titleEl.appendChild(document.createTextNode(" "));
      });
      if (li < lines.length - 1)
        titleEl.appendChild(document.createTextNode("\n"));
    });
  }

  /* ── PARALLAX HERO ─────────────────────── */
  const heroBg = document.getElementById("hero-bg");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
      },
      { passive: true },
    );
  }

  /* ── PARTÍCULAS FLOTANTES ──────────────── */
  const particlesEl = document.getElementById("particles");
  if (particlesEl) {
    const emojis = ["🌶️", "🔥"];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = emojis[Math.random() > 0.5 ? 0 : 1];
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        --dur: ${7 + Math.random() * 8}s;
        --delay: ${Math.random() * 10}s;
        font-size: ${10 + Math.random() * 14}px;
      `;
      particlesEl.appendChild(p);
    }
  }

  /* ── NAV SCROLL ────────────────────────── */
  const hdr = document.getElementById("hdr");
  if (hdr) {
    window.addEventListener(
      "scroll",
      () => {
        hdr.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true },
    );
  }

  /* ── HAMBURGER / DRAWER ────────────────── */
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("drawer");

  const toggleMenu = (open) => {
    hamburger.classList.toggle("open", open);
    drawer.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (hamburger && drawer) {
    hamburger.addEventListener("click", () => {
      toggleMenu(!hamburger.classList.contains("open"));
    });
    document.querySelectorAll(".drawer-link").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleMenu(false);
    });
  }

  /* ── SCROLL REVEAL ─────────────────────── */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  /* ── COUNTER ANIMATION ─────────────────── */
  const counters = document.querySelectorAll(".stat .val[data-target]");

  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 35);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterIO.observe(c));
}); // end DOMContentLoaded
