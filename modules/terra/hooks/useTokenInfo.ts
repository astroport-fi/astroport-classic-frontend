import { useCallback } from "react";

import { lookupSymbol } from "libs/parse";
import { useTerra } from "contexts/TerraContext";
import { getNativeTokenIconUrl } from "modules/terra";
import whitelist from "constants/whitelist.json";

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
      const info = whitelist[name][token];

      if (info?.icon) {
        return info?.icon;
      }

      return getNativeTokenIconUrl(lookupSymbol(symbol));
    },
    [getSymbol, name]
  );

  return {
    getSymbol,
    getIcon,
  };
};

export default useTokenInfo;
