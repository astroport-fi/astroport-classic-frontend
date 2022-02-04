import { useMemo } from "react";
import { gql } from "graphql-request";
import { useAddress } from "@arthuryeti/terra";

import { useHive } from "modules/common";

interface Balances {
  [key: string]: string;
}

const createQuery = (address, contracts) => {
  if (!address) {
    return;
  }

  return gql`
    {
      bank {
        balance(address: "${address}") {
          denom, amount
        }
      }
      ${contracts
        .map(
          (contractAddress) => `
        ${contractAddress}: wasm {
          contractQuery(
            contractAddress: "${contractAddress}",
            query: {
              balance: {
                address: "${address}"
              }
            }
          )
        }
      `
        )
        .join("")}
    }
  `;
};

// NOTE: native token identification strategy mirrors
//       react-terra (arthuryeti/terra)'s useBalance hook
const isNativeToken = (token) => token.startsWith("u");

// Given array of tokens
// (native token denoms and/or contract token addresses)
// combines into single Hive query for all balances,
// returns memoized object with token keys and string balance values.
// All tokens are guaranteed to be included in object.
export const useBalances = (tokens: string[]): Balances => {
  const address = useAddress();

  const nativeTokens = tokens.filter((token) => isNativeToken(token));
  const contractTokens = tokens.filter((token) => !isNativeToken(token));

  const query = createQuery(address, contractTokens);

  const result = useHive({
    name: ["balances", address, ...tokens],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result === null) {
      return {};
    }

    const balances = {};

    for (const token of nativeTokens) {
      balances[token] =
        result.bank.balance.find(({ denom }) => denom === token)?.amount || "0";
    }

    for (const token of contractTokens) {
      balances[token] = result[token].contractQuery.balance;
    }

    return balances;
  }, [result]);
};

export default useBalances;
