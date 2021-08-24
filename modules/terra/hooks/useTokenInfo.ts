import { useCallback } from "react";

import { useTerra } from "contexts/TerraContext";
import whitelist from "constants/whitelist.json";

export const useTokenInfo = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  const getSymbol = useCallback(
    (token: string) => {
      return whitelist[name].tokens[token]?.symbol ?? token;
    },
    [name]
  );

  const getIcon = useCallback(
    (token: string) => {
      const info = whitelist[name].tokens[token];

      if (info?.icon) {
        return info?.icon;
      }

      return "";
    },
    [name]
  );

  return {
    getSymbol,
    getIcon,
  };
};

export default useTokenInfo;
