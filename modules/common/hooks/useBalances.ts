import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import { gql } from "graphql-request";
import { ONE_TOKEN } from "constants/constants";
import { isNativeToken, useHive, useTokenInfo } from "modules/common";
import num from "libs/num";

interface Balances {
  [key: string]: string;
}

const createQueryContractTokens = (address: string, tokens: string[]) => {
  if (tokens.length === 0 || !address) {
    return;
  }

  return gql`
    {
      ${tokens.map((token) => {
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

const createQueryNativeTokens = (address: string) => {
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
    }
  `;
};

// Given array of tokens
// (native token denoms and/or contract token addresses)
// combines into Hive queries for all balances,
// returns memoized object with token keys and balance values after normalized by token decimals.
// All tokens are guaranteed to be included in object.
export const useBalances = (tokens: string[]): Balances => {
  const { getDecimals } = useTokenInfo();
  const address = useAddress() || "";

  const contractTokens = tokens.filter((token) => !isNativeToken(token));
  const nativeTokens = tokens.filter((token) => isNativeToken(token));

  const queryContract = createQueryContractTokens(address, contractTokens);
  const queryNative = createQueryNativeTokens(address);

  const resultContractTokens = useHive({
    name: ["balances", "contract-tokens", address, ...tokens],
    query: queryContract,
    options: {
      enabled: !!queryContract,
    },
  });

  const resultNativeTokens = useHive({
    name: ["balances", "native-tokens", address],
    query: queryNative,
    options: {
      enabled: !!queryNative,
    },
  });

  return useMemo(() => {
    if (resultContractTokens == null && resultNativeTokens == null) {
      return {};
    }

    let data = {};
    tokens.forEach((t) => (data[t] = 0));

    // CONTRACT TOKENS
    if (resultContractTokens) {
      Object.keys(resultContractTokens).forEach((token) => {
        if (resultContractTokens[token]) {
          data[token] =
            num(resultContractTokens[token].contractQuery?.balance)
              .div(10 ** getDecimals(token))
              .toNumber() || 0;
        }
      });
    }

    // NATIVE TOKENS
    if (resultNativeTokens && resultNativeTokens?.bank?.balance?.length > 0) {
      resultNativeTokens.bank.balance.forEach((item) => {
        if (nativeTokens.includes(item.denom)) {
          data[item.denom] = num(item.amount).div(ONE_TOKEN).toNumber() || 0;
        }
      });
    }

    return data;
  }, [resultContractTokens, resultNativeTokens]);
};

export default useBalances;
