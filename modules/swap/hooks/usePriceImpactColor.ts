export function usePriceImpactColor(priceImpact: number) {
  if (priceImpact <= 1) {
    return "green.500";
  } else if (priceImpact <= 5) {
    return "orange";
  } else {
    return "red.500";
  }
}

export default usePriceImpactColor;
