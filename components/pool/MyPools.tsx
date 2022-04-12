import React, { FC, useMemo } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { APR_TOOLTIP } from "constants/constants";
import { useAllPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import AprTd from "components/table/AprTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import MyPoolActionsTd from "components/table/MyPoolActionsTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";
import useAddress from "hooks/useAddress";

const MyPools: FC = () => {
  const address = useAddress();
  const myPools = useAllPools().filter((pool) => pool.inUse);
  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  const columns = useMemo(
    () => [
      {
        id: "favorite",
        width: 48,
        flexGrow: 0,
        Cell: ({ row }: any) => (
          <FavoriteToggleButton pool={row.original.assets.toString()} />
        ),
        accessor: "favorite",
        disableSortBy: true,
        disableGlobalFilter: true,
        sortType: "basic",
      },
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
            contract={row.original.contract}
          />
        ),
        accessor: "sortingAssets",
        width: 275,
      },
      {
        Header: "Combined APR",
        Tooltip: APR_TOOLTIP,
        Cell: ({ row }: any) => <AprTd row={row} />,
        accessor: "rewards.total",
        width: 140,
        disableGlobalFilter: true,
        sortType: (a: any, b: any) =>
          a.original.rewards.total - b.original.rewards.total,
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            type="totalLiquidity"
            tokenTooltip={{
              poolAssets: row.original.poolAssets,
              myLiquidity: row.original.myLiquidity,
              totalLiquidity: row.original.totalLiquidity,
            }}
            value={row.original.totalLiquidityInUst}
          />
        ),
        accessor: "totalLiquidityInUst",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        Header: "24h Volume",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original._24hr_volume} format="0,0" />
        ),
        accessor: "_24hr_volume",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            type="myLiquidity"
            tokenTooltip={{
              poolAssets: row.original.poolAssets,
              myLiquidity: row.original.myLiquidity,
              totalLiquidity: row.original.totalLiquidity,
            }}
            value={row.original.myLiquidityInUst}
          />
        ),
        accessor: "myLiquidityInUst",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => <MyPoolActionsTd data={row.original} />,
        accessor: "actions",
        width: 200,
        flex: 1,
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    [favoritesPools]
  );

  return (
    <Card overflow="auto" position="initial" noPadding>
      <PoolTable
        data={myPools}
        columns={columns}
        emptyMsg="You need to add liquidity first."
        sortBy="myLiquidityInUst"
        renderFilters={address.length !== 0}
      />
    </Card>
  );
};

export default MyPools;
