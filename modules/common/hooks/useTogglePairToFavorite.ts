export const useTogglePairToFavorite = (
  pair: string,
  ...favoritesPools: any
) => {
  const newFavoritePools = [...favoritesPools];
  const pairIndex = favoritesPools.indexOf(pair);
  if (pairIndex > -1) {
    newFavoritePools.splice(pairIndex, 1);
  } else {
    newFavoritePools.push(pair);
  }
  return newFavoritePools;
};
