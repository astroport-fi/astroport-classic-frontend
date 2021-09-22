import { useAddress, useTerra } from "@arthuryeti/terra";
import { useMemo } from "react";
import { useQuery } from "react-query";

type Response = {
  balance: string;
};

export const useLpBalances = () => {
  const { client, pairs } = useTerra();
  const address = useAddress();

  const { data } = useQuery("lpBalances", () => {
    return Promise.all(
      pairs.map(async (pair) => {
        const res = await client.wasm.contractQuery<Response>(pair.lpToken, {
          balance: {
            address,
          },
        });

        return {
          contract: pair.lpToken,
          balance: res.balance,
        };
      })
    );
  });

  return useMemo(() => {
    if (data == null) {
      return {};
    }

    return data.reduce((p, c) => {
      return { ...p, [c.contract]: c.balance };
    }, {});
  }, [data]);
};

export default useLpBalances;
