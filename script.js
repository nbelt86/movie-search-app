// This is yours to build, one line at a time.
const apiKey = "e105a334"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

searchBtn.addEventListener("click", async () => {
  const searchTerm = searchInput.value;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  const response = await fetch(url);

});
