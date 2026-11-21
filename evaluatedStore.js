import { salvarFuncionalidadesFilme } from './lib/supabase';

const evaluations = [];

export function getEvaluatedMovies() {
  return [...evaluations];
}

export function getMovieRating(movieId) {
  return (
    evaluations.find((movie) => String(movie.id) === String(movieId))
      ?.userRating || 0
  );
}

export function setMovieRating(movie, rating) {
  const index = evaluations.findIndex(
    (item) => String(item.id) === String(movie.id)
  );

  if (rating <= 0) {
    if (index >= 0) {
      evaluations.splice(index, 1);
    }

    salvarFuncionalidadesFilme(movie.id, { avaliacao: null }).catch(console.error);
    return;
  }

  const evaluatedMovie = { ...movie, userRating: rating };

  if (index >= 0) {
    evaluations[index] = evaluatedMovie;
  } else {
    evaluations.push(evaluatedMovie);
  }

  salvarFuncionalidadesFilme(movie.id, { avaliacao: rating }).catch(console.error);
}

export function substituirAvaliacoes(movies) {
  evaluations.splice(0, evaluations.length, ...(movies || []));
}
