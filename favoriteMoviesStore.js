const favoriteMovies = [];
const listeners = new Set();

function normalizeMovie(movie) {
  if (!movie || !movie.id) {
    return null;
  }

  const posterPath =
    movie.poster_path ||
    movie.poster ||
    movie.imagem ||
    null;

  return {
    ...movie,
    id: Number(movie.id) || movie.id,
    title: movie.title || movie.original_title || movie.nome || 'Filme',
    original_title:
      movie.original_title || movie.title || movie.nome || 'Filme',
    nome: movie.nome || movie.title || movie.original_title || 'Filme',
    poster_path: posterPath,
    poster: posterPath,
    imagem: posterPath,
  };
}

function notifyListeners() {
  const movies = getFavoriteMovies();
  listeners.forEach((listener) => listener(movies));
}

export function getFavoriteMovies() {
  return favoriteMovies.map((movie) => normalizeMovie(movie)).filter(Boolean);
}

export function isMovieFavorite(movieId) {
  return favoriteMovies.some(
    (movie) => String(normalizeMovie(movie)?.id) === String(movieId)
  );
}

export function toggleFavoriteMovie(movie) {
  const normalizedMovie = normalizeMovie(movie);

  if (!normalizedMovie) {
    return false;
  }

  const index = favoriteMovies.findIndex(
    (item) => String(normalizeMovie(item)?.id) === String(normalizedMovie.id)
  );

  if (index >= 0) {
    favoriteMovies.splice(index, 1);
    notifyListeners();
    return false;
  }

  favoriteMovies.push(normalizedMovie);
  notifyListeners();
  return true;
}

export function subscribeToFavoriteMovies(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
