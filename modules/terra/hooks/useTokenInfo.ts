import { useCallback } from "react";

import { getIsTokenNative, lookupSymbol } from "libs/parse";
import { ICON_URL } from "constants/constants";
import { useTerra } from "contexts/TerraContext";
import whitelist from "constants/whitelist.json";
import { Asset } from "types/asset";

export const useTokenInfo = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  const getSymbol = useCallback(
    (token: string) => {
      return whitelist[name][token]?.symbol ?? token;
    },
    [name]
  );

  const getIcon = useCallback(
    (token: string) => {
      const symbol = getSymbol(token);

      const ticker = getIsTokenNative(symbol)
        ? lookupSymbol(symbol)
        : symbol.startsWith("m")
        ? symbol.slice(1)
        : symbol;

      const icon = ticker && `${ICON_URL}/${ticker}.png`;
      return icon;
    },
    [getSymbol]
  );

  const toAssetInfo = (token: string) =>
    getIsTokenNative(token)
      ? { native_token: { denom: token } }
      : { token: { contract_addr: token } };

  const toToken = ({ amount, token }: Asset) => ({
    amount,
    info: toAssetInfo(token),
  });

  return {
    getSymbol,
    getIcon,
    toToken,
  };
};

export default useTokenInfo;
