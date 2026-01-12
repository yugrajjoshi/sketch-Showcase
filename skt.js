const closeBtn = document.querySelector(".close");
const guitarAudio = document.getElementById("guitar-audio");
const guitarBtn = document.getElementById("guitar-audio-btn");
const themeToggle = document.getElementById("theme-toggle");
const bodyEl = document.body;


if (guitarBtn && guitarAudio) {
  guitarBtn.addEventListener("click", () => {
    if (guitarAudio.paused) {
      guitarAudio.play();
      guitarBtn.textContent = "❚❚ Pause";
    } else {
      guitarAudio.pause();
      guitarBtn.textContent = "▶ Play";
    }
  });

  guitarAudio.addEventListener("ended", () => {
    guitarBtn.textContent = "▶ Play";
  });
}

// Theme toggle (light/dark)
const savedTheme = localStorage.getItem("theme-mode");
if (savedTheme === "dark") {
  bodyEl.classList.add("dark-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = bodyEl.classList.toggle("dark-mode");
    localStorage.setItem("theme-mode", isDark ? "dark" : "light");
  });
}

// Quadrant-based tilt hover effect on sketch cards
const tiltCards = document.querySelectorAll(
  ".sketch-card, .sketch-card2, .sketch-card3, .sketch-card4"
);

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Determine quadrant: top-left, top-right, bottom-left, bottom-right
    const isTop = y < rect.height / 2;
    const isLeft = x < rect.width / 2;

    // Edge lift mapping via rotateX/rotateY
    const rx = isTop ? -6 : 6; // lift top edge when in top half
    const ry = isLeft ? 6 : -6; // lift left edge when in left half

    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;

    // Directional shadow based on tilt
    const shadowX = ry > 0 ? 20 : -20;
    const shadowY = rx > 0 ? -15 : 25;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.35)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});
