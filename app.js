// =======================
// 🌟 CẤU HÌNH
// =======================
const API_KEY = 06e0e61c431aedf92744213b2e14ad02; // Thay bằng API Key TMDB của bạn
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${06e0e61c431aedf92744213b2e14ad02}&language=vi-VN`;
const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=${06e0e61c431aedf92744213b2e14ad02}&language=vi-VN&page=1`;

// =======================
// 🎬 POPUP TRAILER
// =======================
const trailerPopup = document.getElementById("videoPopup");
const trailerVideo = document.getElementById("trailerVideo");

function openTrailer(videoKey) {
  trailerVideo.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
  trailerPopup.style.display = "flex";
}

document.querySelector(".close-btn").addEventListener("click", () => {
  trailerPopup.style.display = "none";
  trailerVideo.src = "";
});

trailerPopup.addEventListener("click", (e) => {
  if (e.target === trailerPopup) {
    trailerPopup.style.display = "none";
    trailerVideo.src = "";
  }
});

// =======================
// 🏷 FADE-IN KHI CUỘN
// =======================
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

// =======================
// 🎥 LOAD PHIM TỪ TMDB
// =======================
async function loadMovies(apiUrl, sliderIndex) {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const sliderContainer = document.querySelectorAll(".slider-container")[sliderIndex];
    const movieRow = sliderContainer.querySelector(".movie-row");
    movieRow.innerHTML = "";

    data.results.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt = movie.title;
      img.title = movie.title;

      // Click mở trailer
      img.addEventListener("click", async () => {
        try {
          const vidRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=vi-VN`);
          const vidData = await vidRes.json();
          const trailer = vidData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
          if (trailer) openTrailer(trailer.key);
          else alert("Trailer chưa có sẵn cho phim này.");
        } catch (err) {
          console.error("Lỗi load trailer:", err);
        }
      });

      movieDiv.appendChild(img);
      movieRow.appendChild(movieDiv);
    });

    setupSlider(sliderContainer, movieRow);

  } catch (err) {
    console.error("Lỗi load phim:", err);
  }
}

// =======================
// 🏎️ SLIDER AUTO + NÚT TRÁI/PHẢI
// =======================
function setupSlider(sliderContainer, movieRow) {
  const leftBtn = sliderContainer.querySelector(".slider-btn.left");
  const rightBtn = sliderContainer.querySelector(".slider-btn.right");

  leftBtn.addEventListener("click", () => {
    movieRow.scrollBy({ left: -300, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    movieRow.scrollBy({ left: 300, behavior: "smooth" });
  });

  // Auto-slide
  setInterval(() => {
    movieRow.scrollBy({ left: 300, behavior: "smooth" });
    if (movieRow.scrollLeft + movieRow.clientWidth >= movieRow.scrollWidth - 10) {
      setTimeout(() => {
        movieRow.scrollTo({ left: 0, behavior: "smooth" });
      }, 1000);
    }
  }, 5000);
}

// =======================
// 🌫 HERO TEXT ANIMATION
// =======================
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

// =======================
// 🔥 LOAD TRƯỚC TRANG
// =======================
window.addEventListener("load", () => {
  loadMovies(TRENDING_API, 0);      // Slider 0 = trending
  loadMovies(NOW_PLAYING_API, 1);   // Slider 1 = phim mới
});
