// This is yours to build, one line at a time.
const apiKey = "e105a334";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resultsSection = document.querySelector("#results");

async function searchMovies() {
  const searchTerm = searchInput.value;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  const response = await fetch(url);
  const movieData = await response.json();


  if (movieData.Response === "True") {
    resultsSection.innerHTML = movieData.Search.map(movie => `
      <div class = "movie-card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
      </div>
      `).join("")}
  else resultsSection.innerHTML = "No movie found!";
};

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
