const watchlist = [];

export function getWatchlist() {
  return [...watchlist];
}

export function isInWatchlist(movieId) {
  return watchlist.some((movie) => String(movie.id) === String(movieId));
}

export function toggleWatchlist(movie) {
  const index = watchlist.findIndex(
    (item) => String(item.id) === String(movie.id)
  );

  if (index >= 0) {
    watchlist.splice(index, 1);
    return false;
  }

  watchlist.push(movie);
  return true;
}
