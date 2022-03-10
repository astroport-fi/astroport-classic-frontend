import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useAstroswap } from "modules/common";
import { useMemo } from "react";
import { useQuery } from "react-query";

type Response = {
  balance: string;
};

export const useLpBalances = () => {
  const { client } = useTerraWebapp();
  const { pairs } = useAstroswap();
  const address = useAddress();

  const { data } = useQuery(
    "lpBalances",
    () => {
      if (pairs == null) {
        return null;
      }

      return Promise.all(
        pairs.map(async (pair) => {
          const res = await client.wasm.contractQuery<Response>(
            pair.liquidity_token,
            {
              balance: {
                address,
              },
            }
          );

          return {
            contract: pair.liquidity_token,
            balance: res.balance,
          };
        })
      );
    },
    {
      enabled: pairs != null && !!address,
    }
  );

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
