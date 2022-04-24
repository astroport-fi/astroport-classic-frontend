import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import { isNativeToken } from "../asset";
import { QUERY_STALE_TIME } from "constants/constants";

function isBalanceResponse(value) {
  return value.hasOwnProperty("balance");
}

export const useBalance = (token: string, contractAddress?: string) => {
  const terraAddress = useAddress();
  const { client } = useTerraWebapp();
  const address = contractAddress != null ? contractAddress : terraAddress;

  const { data, isLoading } = useQuery<any>(
    ["balance", token, address],
    () => {
      if (isNativeToken(token)) {
        return client.bank.balance(address);
      }

      return client.wasm.contractQuery(token, {
        balance: {
          address,
        },
      });
    },
    {
      enabled: !!address,
      refetchOnMount: true,
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (isLoading || !data) {
      return null;
    }

    if (isBalanceResponse(data)) {
      return data.balance;
    }

    const tokenResult = data[0].get(token);

    return tokenResult ? tokenResult.amount.toString() : null;
  }, [data, isLoading]);
};

export default useBalance;
