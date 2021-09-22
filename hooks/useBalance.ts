import { useQuery } from "react-query";
import { useAddress, useTerra } from "@arthuryeti/terra";

import { getIsTokenNative } from "libs/parse";

export const useBalance = (token: string) => {
  const { client } = useTerra();
  const address = useAddress();

  const { data, isLoading } = useQuery<{ balance: string } | any>(
    ["balance", token, address],
    () => {
      if (getIsTokenNative(token)) {
        return client.bank.balance(address);
      }

      return client.wasm.contractQuery(token, {
        balance: {
          address,
        },
      });
    }
  );

  if (isLoading || !data) {
    return "0.00";
  }

  // cw20 balance
  if (data.balance) {
    return data.balance;
  }

  // Native coin balace
  if (data?.get(token)) {
    return data?.get(token).amount.toString();
  }

  return "0";
};

export default useBalance;
