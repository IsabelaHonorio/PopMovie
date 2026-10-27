const favoriteMovies = [];
const listeners = new Set();

function notifyListeners() {
  const movies = getFavoriteMovies();
  listeners.forEach((listener) => listener(movies));
}

export function getFavoriteMovies() {
  return [...favoriteMovies];
}

export function isMovieFavorite(movieId) {
  return favoriteMovies.some((movie) => String(movie.id) === String(movieId));
}

export function toggleFavoriteMovie(movie) {
  const index = favoriteMovies.findIndex(
    (item) => String(item.id) === String(movie.id)
  );

  if (index >= 0) {
    favoriteMovies.splice(index, 1);
    notifyListeners();
    return false;
  }

  favoriteMovies.push(movie);
  notifyListeners();
  return true;
}

export function subscribeToFavoriteMovies(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
