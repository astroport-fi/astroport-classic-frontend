export const useTogglePoolToFavorite = (
  pool: string,
  ...favoritesPools: any
) => {
  const newFavoritePools = [...favoritesPools];
  const poolIndex = favoritesPools.indexOf(pool);
  if (poolIndex > -1) {
    newFavoritePools.splice(poolIndex, 1);
  } else {
    newFavoritePools.push(pool);
  }
  return newFavoritePools;
};
