import React, { FC, useMemo } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { REWARDS_NOTICE } from "constants/constants";
import { useAllPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import AprTd from "components/table/AprTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import MyPoolActionsTd from "components/table/MyPoolActionsTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";

const MyPools: FC = () => {
  const myPools = useAllPools().filter((pool) => pool.inUse);
  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  const columns = useMemo(
    () => [
      {
        id: "favorite",
        width: 48,
        flexGrow: 0,
        Cell: ({ row }: any) => (
          <FavoriteToggleButton pair={row.original.assets.toString()} />
        ),
        accessor: "favorite",
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
          />
        ),
        accessor: "sortingAssets",
        width: 275,
      },
      {
        Header: "Combined APR",
        Tooltip: REWARDS_NOTICE,
        Cell: ({ row }: any) => <AprTd row={row} />,
        accessor: "rewards.total",
        width: 140,
        disableGlobalFilter: true,
        sortType: (a, b) => a.original.rewards.total - b.original.rewards.total,
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            value={row.original.totalLiquidityInUst}
            format="0,0"
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
          <NumberInUstTd value={row.original.myLiquidityInUst} />
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
        position: "sticky",
        right: "15px",
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    [favoritesPools]
  );

  return (
    <Card overflow="auto" noPadding>
      <PoolTable
        data={myPools}
        columns={columns}
        emptyMsg="You need to add liquidity first."
        sortBy="myLiquidityInUst"
      />
    </Card>
  );
};

export default MyPools;
