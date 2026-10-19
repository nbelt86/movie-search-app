const FAVORITES_KEY = "favorites";

function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function isFavorite(imdbID) {
  return getFavorites().some(movie => movie.imdbID === imdbID);
}

function toggleFavorite(movie) {
  const favorites = getFavorites();
  const index = favorites.findIndex(favorite => favorite.imdbID === movie.imdbID);

  if (index === -1) {
    favorites.push(movie);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

function updateFavoritesCount() {
  const countBadge = document.querySelector("#favorites-count");
  if (countBadge) {
    countBadge.textContent = getFavorites().length;
  }
}

function favoriteButtonMarkup(imdbID) {
  const favorited = isFavorite(imdbID);
  return `<button class="favorite-btn ${favorited ? "is-favorite" : ""}" data-imdbid="${imdbID}" aria-label="Toggle favorite">${favorited ? "&#9733;" : "&#9734;"}</button>`;
}

function renderFavoritesPage() {
  const favoritesGrid = document.querySelector("#favorites-grid");
  if (!favoritesGrid) return;

  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `<p class="status-message">You haven't saved any movies yet. Search for one and tap the star to add it here.</p>`;
    return;
  }

  favoritesGrid.innerHTML = favorites.map(movie => `
    <div class="movie-card" data-imdbid="${movie.imdbID}">
      ${favoriteButtonMarkup(movie.imdbID)}
      <img src="${movie.Poster}" alt="${movie.Title}">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p class="movie-year">${movie.Year}</p>
      </div>
    </div>
    `).join("");
}

function handleFavoritesGridClick(event) {
  const favoriteBtn = event.target.closest(".favorite-btn");
  if (favoriteBtn) {
    event.stopPropagation();
    toggleFavorite({ imdbID: favoriteBtn.dataset.imdbid });
    updateFavoritesCount();
    renderFavoritesPage();
    return;
  }

  const card = event.target.closest(".movie-card");
  if (card) {
    window.location.href = `details.html?id=${card.dataset.imdbid}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateFavoritesCount();
  renderFavoritesPage();

  const favoritesGrid = document.querySelector("#favorites-grid");
  if (favoritesGrid) {
    favoritesGrid.addEventListener("click", handleFavoritesGridClick);
  }
});
