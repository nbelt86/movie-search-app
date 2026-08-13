// This is yours to build, one line at a time.
const apiKey = "e105a334";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resultsSection = document.querySelector("#results");

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
