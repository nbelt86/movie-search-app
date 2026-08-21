const apiKey = "e105a334";
const params = new URLSearchParams(window.location.search)
const imdbID = params.get("id")
const poster = document.querySelector("#detail-poster")
const title = document.querySelector("#detail-title")
const meta = document.querySelector("#detail-meta")
const plot = document.querySelector("#detail-plot")
const director = document.querySelector("#detail-director")

async function loadMovieInfo () {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  const response = await fetch(url);
  const movieInfo = await response.json();
  poster.src = movieInfo.Poster;
  title.textContent = movieInfo.Title;
  meta.textContent = `${movieInfo.Year} ${movieInfo.Genre}
  ${movieInfo.imdbRating}`;
  plot.textContent = movieInfo.Plot;
  director.textContent = movieInfo.Director;

};

loadMovieInfo()
