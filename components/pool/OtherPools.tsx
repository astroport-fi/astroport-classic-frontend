import React, { FC, useMemo } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { REWARDS_NOTICE } from "constants/constants";
import { useAllPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import AprTd from "components/table/AprTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";

const OtherPools: FC = () => {
  const allPools = useAllPools().filter((pool) => !pool.inUse);
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
        id: "pool-actions",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
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
        data={allPools}
        columns={columns}
        sortBy="totalLiquidityInUst"
      />
    </Card>
  );
};

export default OtherPools;
