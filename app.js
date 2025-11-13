// === TMDB API ===
const API_KEY = "06e0e61c431aedf92744213b2e14ad02";
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=vi-VN`;
const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=vi-VN&page=1`;

// === POPUP TRAILER ===
const trailerPopup = document.getElementById("videoPopup");
const trailerVideo = document.getElementById("trailerVideo");

function openTrailer(videoKey){
  trailerVideo.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
  trailerPopup.style.display = "flex";
}

document.querySelector(".close-btn").addEventListener("click", ()=>{
  trailerPopup.style.display = "none";
  trailerVideo.src = "";
});

trailerPopup.addEventListener("click", (e)=>{
  if(e.target === trailerPopup){
    trailerPopup.style.display = "none";
    trailerVideo.src = "";
  }
});

// === FADE-IN ON SCROLL ===
const faders = document.querySelectorAll(".fade-in");
function fadeInOnScroll(){
  const triggerBottom = window.innerHeight * 0.9;
  faders.forEach(f=>{
    if(f.getBoundingClientRect().top < triggerBottom) f.classList.add("visible");
  });
}
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// === LOAD MOVIES ===
async function loadMovies(apiUrl, sliderIndex){
  try{
    const res = await fetch(apiUrl);
    const data = await res.json();

    const sliderContainer = document.querySelectorAll(".slider-container")[sliderIndex];
    const movieRow = sliderContainer.querySelector(".movie-row");
    movieRow.innerHTML = "";

    data.results.forEach(movie=>{
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt = movie.title;
      img.title = movie.title;

      // Click poster mở trailer / teaser
      img.addEventListener("click", async ()=>{
        try{
          const vidRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=vi-VN`);
          const vidData = await vidRes.json();
          const trailer = vidData.results.find(v=>(v.type==="Trailer"||v.type==="Teaser") && v.site==="YouTube");

          if(trailer) openTrailer(trailer.key);
          else alert("Trailer/Teaser chưa có sẵn cho phim này.");
        }catch(err){
          console.error("Lỗi load trailer:", err);
        }
      });

      movieDiv.appendChild(img);
      movieRow.appendChild(movieDiv);
    });

    setupSlider(sliderContainer, movieRow);

    if(sliderIndex === 0 && data.results.length > 0){
      setHero(data.results[0]);
    }

  }catch(err){
    console.error("Lỗi load phim:", err);
  }
}

// === HERO BANNER ===
function setHero(movie){
  const hero = document.getElementById("hero");
  const heroLabel = document.getElementById("heroLabel");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc = document.getElementById("heroDesc");
  const playBtn = document.getElementById("playButton");
  const addBtn = document.querySelector(".add-list");

  hero.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`;
  heroTitle.textContent = movie.title;
  heroDesc.textContent = movie.overview;

  setTimeout(()=>{ heroLabel.classList.add("visible"); },500);
  setTimeout(()=>{ heroTitle.classList.add("visible-hero-content"); },1000);
  setTimeout(()=>{ heroDesc.classList.add("visible-hero-content"); },1200);
  setTimeout(()=>{ playBtn.classList.add("visible-hero-content"); },1400);
  setTimeout(()=>{ addBtn.classList.add("visible-hero-content"); },1600);

  playBtn.onclick = async ()=>{
    try{
      const vidRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=vi-VN`);
      const vidData = await vidRes.json();
      const trailer = vidData.results.find(v=>(v.type==="Trailer"||v.type==="Teaser") && v.site==="YouTube");

      if(trailer) openTrailer(trailer.key);
      else alert("Trailer/Teaser chưa có sẵn cho phim này.");
    }catch(err){
      console.error("Lỗi load trailer:", err);
    }
  };
}

// === SLIDER ===
function setupSlider(sliderContainer, movieRow){
  const leftBtn = sliderContainer.querySelector(".slider-btn.left");
  const rightBtn = sliderContainer.querySelector(".slider-btn.right");

  leftBtn.addEventListener("click", ()=> movieRow.scrollBy({left:-300, behavior:"smooth"}));
  rightBtn.addEventListener("click", ()=> movieRow.scrollBy({left:300, behavior:"smooth"}));

  setInterval(()=>{
    movieRow.scrollBy({left:300, behavior:"smooth"});
    if(movieRow.scrollLeft + movieRow.clientWidth >= movieRow.scrollWidth-10){
      setTimeout(()=>{ movieRow.scrollTo({left:0, behavior:"smooth"}); },1000);
    }
  },5000);
}

// === MOBILE MENU ===
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.getElementById("mainNav");
mobileBtn.addEventListener("click", ()=> navMenu.classList.toggle("active"));

// === LOAD MOVIES ON PAGE LOAD ===
window.addEventListener("load", ()=>{
  loadMovies(TRENDING_API,0);
  loadMovies(NOW_PLAYING_API,1);
});
