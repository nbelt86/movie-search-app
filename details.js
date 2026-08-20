const apiKey = "e105a334";
const params = new URLSearchParams(window.location.search)
const imdbID = params.get("id")

async function loadMovieInfo () {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  const response = await fetch(url);
  const movieInfo = await response.json();

};

loadMovieInfo()
