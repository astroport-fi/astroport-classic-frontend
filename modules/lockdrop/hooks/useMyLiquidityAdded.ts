import { gql } from "graphql-request";
import { forEach } from "lodash";
import { num } from "@arthuryeti/terra";

import { useAstroPools, useTerraswapPools } from "modules/lockdrop";
import { useLunaPrice } from "modules/common";
import { useHive } from "hooks/useHive";
import { ONE_TOKEN } from "constants/constants";
import { getAssetAmountsInPool } from "libs/terra";

const createQuery = (items) => {
  return gql`
    {
      ${items.map((item) => {
        return `
          ${item.lpToken}: wasm {
            contractQuery(
              contractAddress: "${item.pool}"
              query: {
                pool: {}
              }
            )
          }
        `;
      })}
    }
`;
};

export const useMyLiquidityAdded = () => {
  const items = useTerraswapPools();
  const astroItems = useAstroPools();
  const lunaPrice = useLunaPrice();

  const variables = items.map((item) => {
    return {
      lpToken: item.name,
      pool: item.terraswapPool,
    };
  });

  const query = createQuery(variables);

  const result = useHive({
    name: "my-liquidity-added",
    query,
    options: {
      enabled: variables.length > 0,
    },
  });

  if (result == null) {
    return null;
  }

  let total = 0;

  forEach(astroItems, (item) => {
    const balance = item.myLiquidity;
    const { assets, total_share } = result[item.name].contractQuery;

    const { token1 } = getAssetAmountsInPool(assets, "uusd");

    let amountOfUst = num(token1).div(ONE_TOKEN);

    if (token1 == null) {
      const { token1: uluna } = getAssetAmountsInPool(assets, "uluna");
      amountOfUst = num(uluna).div(ONE_TOKEN).times(lunaPrice);
    }

    const totalLiquidityInUst = amountOfUst.times(2).toNumber();

    total += num(balance)
      .times(totalLiquidityInUst)
      .div(num(total_share).div(ONE_TOKEN))
      .toNumber();
  });

  return total;
};

export default useMyLiquidityAdded;
