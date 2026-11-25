// Theme-matched custom cursor: smooth, lightweight, and safe on touch devices.
(() => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Keep the native cursor on touchscreens, coarse pointers, and reduced-motion setups.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!dot || !ring || !finePointer.matches) return;

  document.body.classList.add("custom-cursor-enabled");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let frameId = 0;
  let active = false;

  const moveCursor = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!active) {
      ringX = mouseX;
      ringY = mouseY;
      active = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  };

  const animateCursor = () => {
    if (!active) {
      frameId = 0;
      return;
    }

    const easing = reducedMotion.matches ? 1 : 0.18;
    ringX += (mouseX - ringX) * easing;
    ringY += (mouseY - ringY) * easing;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    frameId = window.requestAnimationFrame(animateCursor);
  };

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    moveCursor(event);
    if (!frameId) frameId = window.requestAnimationFrame(animateCursor);
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    if (event.target.closest("a, button, .interest-card, [role='button']")) {
      ring.classList.add("hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch") return;
    if (event.target.closest("a, button, .interest-card, [role='button']")) {
      ring.classList.remove("hover");
    }
  });

  document.addEventListener("pointerleave", () => {
    active = false;
    dot.classList.remove("is-visible");
    ring.classList.remove("is-visible", "hover");
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
  });

  document.addEventListener("pointerenter", () => {
    // The cursor becomes visible on the next real pointer movement.
  });
})();

// ===== CUSTOM CURSOR ENGINE =====

(() => {
    // Prevent duplicate initialization
    if (window.customCursorInitialized) return;
    window.customCursorInitialized = true;

    // Disable old animated cursor elements
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    if (dot) dot.style.display = "none";
    if (ring) ring.style.display = "none";

    // Apply custom cursor to the entire website
    const cursorStyle = document.createElement("style");

    cursorStyle.textContent = `
        * {
            cursor: url("./Normal Select.cur"), auto !important;
        }
    `;

    document.head.appendChild(cursorStyle);

})();
