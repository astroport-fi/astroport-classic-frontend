import { useCallback } from "react";
import { truncate } from "libs/text";
import { AssetInfo } from "types/common";
import { useAstroswap } from "../context";
import { COMMON_TOKENS } from "constants/constants";

export type TokenInWallet = {
  address: string;
  balance: string;
  price?: number;
  balanceInUst?: number;
};

export const useTokenInfo = () => {
  const { tokens, pairs } = useAstroswap();

  const getProtocol = useCallback(
    (token: string) => {
      if (tokens == null) {
        return token;
      }

      return tokens[token]?.protocol ?? truncate(token, [3, 3]);
    },
    [tokens]
  );

  const getSymbol = useCallback(
    (token: string) => {
      if (tokens == null) {
        return token;
      }

      return tokens[token]?.symbol ?? truncate(token, [3, 3]);
    },
    [tokens]
  );

  const getDecimals = useCallback(
    (token: string): number => {
      if (tokens == null) {
        return null;
      }

      return tokens[token]?.decimals ?? 6;
    },
    [tokens]
  );

  const getIcon = useCallback(
    (token: string) => {
      if (tokens == null) {
        return "";
      }

      const info = tokens[token];

      if (info?.icon) {
        return info?.icon;
      }

      return "/tokens/default.png";
    },
    [tokens]
  );

  const isHidden = useCallback(
    (token: string) => {
      if (tokens == null || pairs == null) {
        return true;
      }

      return (
        pairs.filter((pair) => {
          return (
            pair.asset_infos.filter((asset: AssetInfo) => {
              return (
                (asset?.token?.contract_addr == token ||
                  asset?.native_token?.denom == token) &&
                !COMMON_TOKENS.includes(token)
              );
            }).length > 0
          );
        }).length <= 0
      );
    },
    [tokens, pairs]
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
