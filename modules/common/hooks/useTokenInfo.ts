import { useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { truncate } from "libs/text";
import { AssetInfo } from "types/common";
import { useAstroswap } from "../context";

export type TokenInWallet = {
  address: string;
  balance: string;
  price?: number;
  balanceInUst?: number;
};

export const useTokenInfo = () => {
  const {
    network: { name },
  } = useWallet();
  const { data, pairs } = useAstroswap();

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

  const getDecimals = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].tokens[token]?.decimals ?? 6;
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

  const isHidden = useCallback(
    (token: string) => {
      if (data == null) {
        return true;
      }

      return (
        pairs.filter((pair) => {
          return (
            pair.asset_infos.filter((asset: AssetInfo) => {
              return asset?.token?.contract_addr == token;
            }).length > 0
          );
        }).length <= 0
      );
    },
    [name, data]
  );

  return {
    getProtocol,
    getSymbol,
    getDecimals,
    getIcon,
    isHidden,
  };
};

export default useTokenInfo;
