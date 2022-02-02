import { useMemo } from "react";
import { num, useAddress, useBalance } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { ONE_TOKEN } from "constants/constants";
import { useHive, useTokenInfo } from "modules/common";

const createQuery = (tokens: string[], address: string) => {
  if (tokens.length === 0) {
    return;
  }

  return gql`
    {
      ${tokens
        .filter((token) => !token.startsWith("u"))
        .map((token) => {
          return `
          ${token}: wasm {
            contractQuery(
              contractAddress: "${token}"
              query: {
                balance: {
                  address: "${address}"
                }
              }
            )
          }
        `;
        })}
    }
`;
};

export const useWalletInfo = (tokens: string[]) => {
  const { getDecimals } = useTokenInfo();
  const address = useAddress();
  const uusd = useBalance("uusd");
  const uluna = useBalance("uluna");
  const query = createQuery(tokens, address);

  const result = useHive({
    name: ["tokens", "balance", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null || !uusd || !uluna) {
      return {};
    }

    let tokens = {
      uusd: num(uusd).div(ONE_TOKEN).toNumber(),
      uluna: num(uluna).div(ONE_TOKEN).toNumber(),
    };

    Object.keys(result).forEach((token) => {
      tokens[token] = num(result[token].contractQuery.balance)
        .div(10 ** getDecimals(token))
        .toNumber();
    });

    return tokens;
  }, [result, uusd, uluna]);
};

export default useWalletInfo;
