import { useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";

import { useAstroswap } from "../context";
import { truncate } from "libs/text";

export const useTokenInfo = () => {
  const {
    network: { name },
  } = useWallet();
  const { data } = useAstroswap();

  const getProtocol = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].tokens[token]?.protocol ?? truncate(token, [3, 3]);
    },
    [name, data]
  );

  const getSymbol = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].tokens[token]?.symbol ?? truncate(token, [3, 3]);
    },
    [name, data]
  );

  const getLpSymbol = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].lpTokens[token]?.symbol ?? truncate(token, [3, 3]);
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

      return "/tokens/default.png";
    },
    [name, data]
  );

  return {
    getProtocol,
    getSymbol,
    getLpSymbol,
    getIcon,
  };
};

export default useTokenInfo;
