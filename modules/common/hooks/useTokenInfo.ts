import { useCallback } from "react";
import { truncate } from "libs/text";
import { AssetInfo } from "types/common";
import { useAstroswap } from "../context";
import { COMMON_TOKENS } from "constants/constants";
import TOKEN_DENYLIST from "constants/tokenDenylist";
import { useGetTokens } from "./useGetTokens";

export type TokenInWallet = {
  address: string;
  balance: string;
  price?: number;
  balanceInUst?: number;
};

export const useTokenInfo = (token_addrs?: string[]) => {
  const { tokens, pools } = useAstroswap();
  const { tokenInfos } = useGetTokens(token_addrs || []);

  const getProtocol = useCallback(
    (token: string): string => {
      let value: string | undefined = truncate(token, [3, 3]);

      if (tokenInfos && tokenInfos[token]) {
        value = tokenInfos[token]?.name;
      }

      if (tokens && tokens[token]) {
        value = tokens[token]?.protocol;
      }

      return value || truncate(token, [3, 3]);
    },
    [tokens, tokenInfos]
  );

  const getSymbol = useCallback(
    (token: string): string => {
      let value: string | undefined = truncate(token, [3, 3]);

      if (tokenInfos && tokenInfos[token]) {
        value = tokenInfos[token]?.symbol;
      }

      if (tokens && tokens[token]) {
        value = tokens[token]?.symbol;
      }

      return value || truncate(token, [3, 3]);
    },
    [tokens, tokenInfos]
  );

  const getDecimals = useCallback(
    (token: string): number => {
      let value: number | undefined = 6;

      if (tokenInfos && tokenInfos[token]) {
        value = tokenInfos[token]?.decimals;
      }

      if (tokens && tokens[token]) {
        value = tokens[token]?.decimals;
      }

      return value || 6;
    },
    [tokens, tokenInfos]
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
      if (tokens == null || pools == null || TOKEN_DENYLIST.includes(token)) {
        return true;
      }

      return (
        pools.filter((pool) => {
          return (
            pool.assets.filter((asset: AssetInfo) => {
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
    [tokens, pools]
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
