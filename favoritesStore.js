export const favoritesState = {
  value: Array(6).fill(null),
};

export function getFavorites() {
  return [...favoritesState.value];
}

export function setFavoriteAt(index, movie) {
  favoritesState.value = favoritesState.value.map((item, i) => (i === index ? movie : item));
  return getFavorites();
}
