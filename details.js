const apiKey = "e105a334";
const posterFallback = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445'%3E%3Crect width='100%25' height='100%25' fill='%232a2a2a'/%3E%3Ctext x='50%25' y='50%25' fill='%23777' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";
const params = new URLSearchParams(window.location.search)
const imdbID = params.get("id")
const movieDetail = document.querySelector("#movie-detail")
const poster = document.querySelector("#detail-poster")
const title = document.querySelector("#detail-title")
const meta = document.querySelector("#detail-meta")
const rating = document.querySelector("#detail-rating")
const plot = document.querySelector("#detail-plot")
const director = document.querySelector("#detail-director")
const favoriteBtn = document.querySelector("#detail-favorite-btn")

async function loadMovieInfo () {
  if (!imdbID) {
    movieDetail.innerHTML = `<p class="status-message">No movie selected. Go back and pick one from the search results.</p>`;
    return;
  }

  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    const response = await fetch(url);
    const movieInfo = await response.json();

    if (movieInfo.Response === "False") {
      movieDetail.innerHTML = `<p class="status-message">Couldn't find that movie. Go back and try another one.</p>`;
      return;
    }

    poster.src = movieInfo.Poster;
    poster.alt = movieInfo.Title;
    poster.onerror = () => { poster.onerror = null; poster.src = posterFallback; };
    title.textContent = movieInfo.Title;
    document.title = `${movieInfo.Title} - Movie Search`;
    meta.textContent = `${movieInfo.Year} · ${movieInfo.Genre}`;
    if (movieInfo.imdbRating && movieInfo.imdbRating !== "N/A") {
      rating.textContent = `★ ${movieInfo.imdbRating} / 10`;
    } else {
      rating.style.display = "none";
    }
    plot.textContent = movieInfo.Plot;
    director.textContent = movieInfo.Director;

    favoriteBtn.classList.toggle("is-favorite", isFavorite(imdbID));
    favoriteBtn.innerHTML = isFavorite(imdbID) ? "&#9733;" : "&#9734;";
    favoriteBtn.addEventListener("click", () => {
      toggleFavorite({
        imdbID: imdbID,
        Title: movieInfo.Title,
        Year: movieInfo.Year,
        Poster: movieInfo.Poster
      });
      favoriteBtn.classList.toggle("is-favorite");
      favoriteBtn.innerHTML = isFavorite(imdbID) ? "&#9733;" : "&#9734;";
      updateFavoritesCount();
    });
  } catch (error) {
    movieDetail.innerHTML = `<p class="status-message status-error">Something went wrong loading this movie. Please try again.</p>`;
  }
};

loadMovieInfo()
