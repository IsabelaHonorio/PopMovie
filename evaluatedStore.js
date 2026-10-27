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
    return;
  }

  const evaluatedMovie = { ...movie, userRating: rating };

  if (index >= 0) {
    evaluations[index] = evaluatedMovie;
  } else {
    evaluations.push(evaluatedMovie);
  }
}
