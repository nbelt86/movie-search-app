// This is yours to build, one line at a time.
const apiKey = "e105a334";
const posterFallback = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445'%3E%3Crect width='100%25' height='100%25' fill='%232a2a2a'/%3E%3Ctext x='50%25' y='50%25' fill='%23777' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resultsSection = document.querySelector("#results");
const movieArray = ["Inception", "The Matrix", "Interstellar", "Parasite",
  "The Dark Knight", "Pulp Fiction", "Fight Club", "Forrest Gump", "The Godfather",
  "Titanic", "Jurassic Park", "The Shawshank Redemption", "Gladiator",
  "Spirited Away", "La La Land", "Whiplash", "Avengers: Endgame",
  "Get Out", "Everything Everywhere All at Once"
];
const carouselTrack = document.querySelector("#carousel-track");
let ringAngle = 0;
const popularMovies = document.querySelector("#popular-movies");



async function searchMovies() {
  const searchTerm = searchInput.value.trim();

  try {
    if (searchTerm === "") {
      resultsSection.innerHTML = `<p class="status-message">Please enter a movie title.</p>`;
      return;
    }

    popularMovies.style.display = "none";

    resultsSection.innerHTML = `<p class="status-message status-loading">Searching...please wait.</p>`;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    const response = await fetch(url);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      resultsSection.innerHTML = movieData.Search.map(movie => `
        <div class = "movie-card" data-imdbid = "${movie.imdbID}">
          ${favoriteButtonMarkup(movie.imdbID)}
          <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null;this.src='${posterFallback}';">
          <div class="movie-card-info">
            <h3>${movie.Title}</h3>
            <p class="movie-year">${movie.Year}</p>
          </div>
        </div>
        `).join("")}

    else resultsSection.innerHTML = `<p class="status-message">No movie found!</p>`;

    searchInput.value = ""
  } catch (error) {
    resultsSection.innerHTML = `<p class="status-message status-error">Something went wrong. Please try again.</p>`;
  }

};

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});

resultsSection.addEventListener("click", (event) => {
  const favoriteBtn = event.target.closest(".favorite-btn");
  if (favoriteBtn) {
    event.stopPropagation();
    const card = favoriteBtn.closest(".movie-card");
    const movie = {
      imdbID: favoriteBtn.dataset.imdbid,
      Title: card.querySelector("h3").textContent,
      Year: card.querySelector(".movie-year").textContent,
      Poster: card.querySelector("img").src
    };
    toggleFavorite(movie);
    favoriteBtn.classList.toggle("is-favorite");
    favoriteBtn.innerHTML = isFavorite(movie.imdbID) ? "&#9733;" : "&#9734;";
    updateFavoritesCount();
    return;
  }

  const card = event.target.closest(".movie-card");
  if (card) {
    const imdbId = card.dataset.imdbid;
    window.location.href = `details.html?id=${imdbId}`;
  }
});

async function loadPopularMovies() {
  for (const [index, title] of movieArray.entries()) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
    const response = await fetch(url);
    const movieData = await response.json();
    const angle = index * (360 / movieArray.length);
    carouselTrack.innerHTML += `<img class="carousel-poster"
    src="${movieData.Search[0].Poster}" alt="${title}"
    onerror="this.onerror=null;this.src='${posterFallback}';"
    style="transform: rotateY(${angle}deg) translateZ(450px)">`;
  }};

loadPopularMovies();

setInterval(() => {
  ringAngle += 1
  carouselTrack.style.transform = `rotateY(${ringAngle}deg)`

  }
, 100);
