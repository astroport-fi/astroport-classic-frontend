import { useTerra } from "contexts/TerraContext";

export const usePair = (token1, token2) => {
  const { pairs } = useTerra();

  if (!pairs || pairs.length == 0) {
    return null;
  }

  const selected = pairs.find((item) => {
    return (
      item.pair.find((s) => s.contract_addr === token1) &&
      item.pair.find((s) => s.contract_addr === token2)
    );
  });

  return selected?.contract;
};

export default usePair;
