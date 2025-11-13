const API_KEY = "06e0e61c431aedf92744213b2e14ad02";
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=vi-VN`;
const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=vi-VN&page=1`;

const trailerPopup = document.getElementById("videoPopup");
const trailerVideo = document.getElementById("trailerVideo");

// Mở trailer
function openTrailer(videoKey){
  trailerVideo.src=`https://www.youtube.com/embed/${videoKey}?autoplay=1`;
  trailerPopup.style.display="flex";
}

document.querySelector(".close-btn").addEventListener("click", ()=>{
  trailerPopup.style.display="none"; 
  trailerVideo.src="";
});
trailerPopup.addEventListener("click",(e)=>{
  if(e.target===trailerPopup){ 
    trailerPopup.style.display="none"; 
    trailerVideo.src=""; 
  }
});

// Fade-in on scroll
const faders=document.querySelectorAll(".fade-in");
function fadeInOnScroll(){
  const triggerBottom=window.innerHeight*0.9;
  faders.forEach(f=>{
    if(f.getBoundingClientRect().top<triggerBottom) f.classList.add("visible");
  });
}
window.addEventListener("scroll",fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// Load movies từ TMDB
async function loadMovies(apiUrl, sliderIndex){
  try{
    const res = await fetch(apiUrl);
    const data = await res.json();
    const sliderContainer = document.querySelectorAll(".slider-container")[sliderIndex];
    const movieRow = sliderContainer.querySelector(".movie-row");
    movieRow.innerHTML="";

    data.results.forEach(movie=>{
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      const img = document.createElement("img");
      img.src=`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt=movie.title;
      img.title=movie.title;

      // Click poster mở trailer / teaser
      img.addEventListener("click", async ()=>{
        try{
          const vidRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=vi-VN`);
          const vidData = await vidRes.json();

          // Tìm trailer ưu tiên, fallback teaser
          const trailer = vidData.results.find(v=>(v.type==="Trailer"||v.type==="Teaser") && v.site==="YouTube");
          if(trailer) openTrailer(trailer.key);
          else alert("Trailer/Teaser chưa có sẵn cho phim này.");

        }catch(err){ console.error("Lỗi load trailer:", err); }
      });

      movieDiv.appendChild(img);
      movieRow.appendChild(movieDiv);
    });

    setupSlider(sliderContainer, movieRow);

  }catch(err){ console.error("Lỗi load phim:", err); }
}

// Slider left/right + auto
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

// Hero animation
window.addEventListener("load", ()=>{
  const heroLabel = document.getElementById("heroLabel");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc = document.getElementById("heroDesc");
  const playBtn = document.getElementById("playButton");
  const addBtn = document.querySelector(".add-list");

  setTimeout(()=>{ heroLabel.classList.add("visible"); },500);
  setTimeout(()=>{ heroTitle.classList.add("visible-hero-content"); },1000);
  setTimeout(()=>{ heroDesc.classList.add("visible-hero-content"); },1200);
  setTimeout(()=>{ playBtn.classList.add("visible-hero-content"); },1400);
  setTimeout(()=>{ addBtn.classList.add("visible-hero-content"); },1600);
});

// Load movies khi load trang
window.addEventListener("load", ()=>{
  loadMovies(TRENDING_API,0);      // Slider trending
  loadMovies(NOW_PLAYING_API,1);   // Slider mới cập nhật
});
