// ------------------------------
// 🎬 Trailer Popup
// ------------------------------
const playButton = document.getElementById("playButton");
const popup = document.getElementById("videoPopup");
const closeBtn = document.querySelector(".close-btn");
const trailerVideo = document.getElementById("trailerVideo");

playButton.addEventListener("click", () => {
  popup.style.display = "flex";
  trailerVideo.play();
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  trailerVideo.pause();
  trailerVideo.currentTime = 0;
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
    trailerVideo.pause();
    trailerVideo.currentTime = 0;
  }
});

// ------------------------------
// 🎞 Slider phim: click + auto slide
// ------------------------------
document.querySelectorAll(".slider-container").forEach(slider => {
  const row = slider.querySelector(".movie-row");
  const left = slider.querySelector(".slider-btn.left");
  const right = slider.querySelector(".slider-btn.right");

  // Cuộn bằng nút
  left.addEventListener("click", () => {
    row.scrollBy({ left: -300, behavior: "smooth" });
  });
  right.addEventListener("click", () => {
    row.scrollBy({ left: 300, behavior: "smooth" });
  });

  // Auto-slide 5s/lần
  setInterval(() => {
    row.scrollBy({ left: 300, behavior: "smooth" });

    // Khi cuộn hết → quay lại đầu
    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 10) {
      setTimeout(() => {
        row.scrollTo({ left: 0, behavior: "smooth" });
      }, 1000);
    }
  }, 5000);
});

// ------------------------------
// 🌫 Fade-in khi cuộn trang
// ------------------------------
const faders = document.querySelectorAll(".fade-in");

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  faders.forEach(fade => {
    const fadeTop = fade.getBoundingClientRect().top;
    if (fadeTop < triggerBottom) fade.classList.add("visible");
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);
// --- Hero label & content animation ---
window.addEventListener("load", () => {
  const heroLabel = document.getElementById("heroLabel");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc = document.getElementById("heroDesc");
  const playBtn = document.getElementById("playButton");
  const addBtn = document.querySelector(".add-list");

  setTimeout(() => { heroLabel.classList.add("visible"); }, 500);
  setTimeout(() => { heroTitle.classList.add("visible-hero-content"); }, 1000);
  setTimeout(() => { heroDesc.classList.add("visible-hero-content"); }, 1200);
  setTimeout(() => { playBtn.classList.add("visible-hero-content"); }, 1400);
  setTimeout(() => { addBtn.classList.add("visible-hero-content"); }, 1600);
});
