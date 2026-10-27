const blockedMovies = [];
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener(getBlockedMovies()));
}

export function getBlockedMovies() {
  return [...blockedMovies];
}

export function isMovieBlocked(movieId) {
  return blockedMovies.some((movie) => String(movie.id) === String(movieId));
}

export function toggleMovieBlocked(movie) {
  const index = blockedMovies.findIndex(
    (item) => String(item.id) === String(movie.id)
  );

  if (index >= 0) {
    blockedMovies.splice(index, 1);
    notifyListeners();
    return false;
  }

  blockedMovies.push(movie);
  notifyListeners();
  return true;
}

export function subscribeToBlockedMovies(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
