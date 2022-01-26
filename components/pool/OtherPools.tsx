import React, { FC, useMemo } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { APY_NOTICE } from "constants/constants";
import { useAllPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import ApyTd from "components/table/ApyTd";
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
        Header: "Combined APY",
        Tooltip: APY_NOTICE,
        Cell: ({ row }: any) => <ApyTd row={row} />,
        accessor: "apy.total",
        width: 140,
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
      },
      {
        Header: "24h Volume",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original._24hr_volume} format="0,0" />
        ),
        accessor: "_24hr_volume",
        width: 140,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
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
    <Card noPadding>
      <PoolTable
        data={allPools}
        columns={columns}
        sortBy="totalLiquidityInUst"
      />
    </Card>
  );
};

export default OtherPools;
