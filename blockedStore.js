import { salvarFuncionalidadesFilme } from './lib/supabase';

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
    salvarFuncionalidadesFilme(movie.id, { bloqueado: false }).catch(console.error);
    return false;
  }

  blockedMovies.push(movie);
  notifyListeners();
  salvarFuncionalidadesFilme(movie.id, { bloqueado: true }).catch(console.error);
  return true;
}

export function subscribeToBlockedMovies(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function substituirBloqueados(movies) {
  blockedMovies.splice(0, blockedMovies.length, ...(movies || []));
  notifyListeners();
}
