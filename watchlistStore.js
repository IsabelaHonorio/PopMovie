import { salvarFuncionalidadesFilme } from './lib/supabase';

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
    salvarFuncionalidadesFilme(movie.id, { lista: false }).catch(console.error);
    return false;
  }

  watchlist.push(movie);
  salvarFuncionalidadesFilme(movie.id, { lista: true }).catch(console.error);
  return true;
}

export function substituirWatchlist(movies) {
  watchlist.splice(0, watchlist.length, ...(movies || []));
}
