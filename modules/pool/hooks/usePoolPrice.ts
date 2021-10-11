import { useState, useEffect, useCallback } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";

import { getAssetAmountsInPool } from "libs/terra";
import { toAmount } from "libs/parse";
import { toAssetInfo } from "modules/common";
import networks from "constants/networks";

export const usePoolPrice: any = (token: string) => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const factory = networks[name].factory;
  const [price, setPrice] = useState<string | null>("0.00");

  const getPool = useCallback(async () => {
    try {
      const pair: any = await client.wasm.contractQuery(factory, {
        pair: {
          asset_infos: [
            toAssetInfo(token),
            {
              native_token: {
                denom: "uusd",
              },
            },
          ],
        },
      });

      if (pair == null) {
        return;
      }

      const pool: any = await client.wasm.contractQuery(pair.contract_addr, {
        pool: {},
      });

      if (pool == null) {
        return;
      }

      const { uusd, other } = getAssetAmountsInPool(pool);

      const price = Number(uusd) / Number(other);

      setPrice(toAmount(String(price)));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [client, token, factory]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  return price;
};

export default usePoolPrice;
