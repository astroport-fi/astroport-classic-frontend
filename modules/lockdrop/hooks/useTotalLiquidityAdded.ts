import { gql } from "graphql-request";
import { forEach } from "lodash";
import { num } from "@arthuryeti/terra";

import { useTerraswapPools } from "modules/lockdrop";
import { useContracts } from "modules/common";
import { useHive } from "hooks/useHive";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (lps, contract) => {
  return gql`
    {
      ${lps.map((lp) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                pool: {
                  terraswap_lp_token: "${lp}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useTotalLiquidityAdded = () => {
  const items = useTerraswapPools();
  const { lockdrop } = useContracts();

  const variables = items.map((item) => {
    return item.name;
  });

  const query = createQuery(variables, lockdrop);

  const result = useHive({
    name: "total-liquidity-added",
    query,
    options: {
      enabled: variables.length > 0,
    },
  });

  if (result == null) {
    return null;
  }

  let total = 0;

  forEach(items, (item) => {
    const pool = result[item.name].contractQuery;

    total += num(pool.terraswap_amount_in_lockups)
      .div(ONE_TOKEN)
      .times(item.totalLiquidityInUst)
      .div(item.totalLiquidity)
      .toNumber();
  });

  return total;
};

export default useTotalLiquidityAdded;
