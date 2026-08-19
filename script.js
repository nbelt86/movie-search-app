// This is yours to build, one line at a time.
const apiKey = "e105a334";
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



async function searchMovies() {
  const searchTerm = searchInput.value.trim();

  try {
    if (searchTerm === "") {
      resultsSection.innerHTML = "Please enter a movie title.";
      return;
    }
    resultsSection.innerHTML = "Searching...please wait.";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    const response = await fetch(url);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      resultsSection.innerHTML = movieData.Search.map(movie => `
        <div class = "movie-card" data-imdbid = "${movie.imdbID}">
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title} (${movie.Year})</h3>

        </div>
        `).join("")}

    else resultsSection.innerHTML = "No movie found!";

    searchInput.value = ""
  } catch (error) {
    resultsSection.innerHTML = "Something went wrong. Please try again."
  }

};

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});

resultsSection.addEventListener("click", async (event) => {
  const card = event.target.closest(".movie-card");
  if (card) {
    const imdbId = card.dataset.imdbid;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`;
    const response = await fetch(url);
    const details = await response.json();
    alert (`${details.Title}\n\n${details.Plot}\n\nRating: ${details.imdbRating}`);
  }
});

async function loadPopularMovies() {
  for (const [index, title] of movieArray.entries()) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
    const response = await fetch(url);
    const movieData = await response.json();
    const angle = index * (360 / movieArray.length);
    carouselTrack.innerHTML += `<img class="carousel-poster"
    src="${movieData.Search[0].Poster}"
    style="transform: rotateY(${angle}deg) translateZ(300px)">`;
  }};

loadPopularMovies();

setInterval(() => {
  ringAngle += 1
  carouselTrack.style.transform = `rotateY(${ringAngle}deg)`

  }
, 50);
