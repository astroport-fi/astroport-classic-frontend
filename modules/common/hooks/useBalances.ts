import { useMemo } from "react";
import { num, useAddress, useBalance } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { ONE_TOKEN } from "constants/constants";
import { useHive, useTokenInfo } from "modules/common";

interface Balances {
  [key: string]: string;
}

const createQuery = (address: string, tokens: string[]) => {
  const allowedTokens = tokens.filter((token) => !token.startsWith("u"));

  if (allowedTokens.length === 0) {
    return;
  }

  return gql`
    {
      ${allowedTokens.map((token) => {
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

// Given array of tokens
// (native token denoms and/or contract token addresses)
// combines into single Hive query for all balances,
// returns memoized object with token keys and balance values after normalized by token decimals.
// All tokens are guaranteed to be included in object.
export const useBalances = (tokens: string[]): Balances => {
  const { getDecimals } = useTokenInfo();
  const address = useAddress();
  const uusd = useBalance("uusd");
  const uluna = useBalance("uluna");
  const query = createQuery(address, tokens);

  const result = useHive({
    name: ["balances", address, ...tokens],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return {};
    }

    let data = {};
    tokens.forEach((t) => (data[t] = 0));

    data["uusd"] = num(uusd).div(ONE_TOKEN).toNumber() || 0;
    data["uluna"] = num(uluna).div(ONE_TOKEN).toNumber() || 0;

    Object.keys(result).forEach((token) => {
      if (result[token]) {
        data[token] =
          num(result[token].contractQuery?.balance)
            .div(10 ** getDecimals(token))
            .toNumber() || 0;
      }
    });

    return data;
  }, [result, uusd, uluna]);
};

export default useBalances;
