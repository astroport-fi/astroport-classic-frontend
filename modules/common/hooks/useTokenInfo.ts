import { useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";

import { useAstroswap } from "../context";

export const useTokenInfo = () => {
  const {
    network: { name },
  } = useWallet();
  const { data } = useAstroswap();

  const getSymbol = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].tokens[token]?.symbol ?? token;
    },
    [name, data]
  );

  const getIcon = useCallback(
    (token: string) => {
      if (data == null) {
        return "";
      }

      const info = data[name].tokens[token];

      if (info?.icon) {
        return info?.icon;
      }

      return "";
    },
    [name, data]
  );

  return {
    getSymbol,
    getIcon,
  };
};

export default useTokenInfo;
