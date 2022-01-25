import React, { FC, useMemo } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { APY_NOTICE } from "constants/constants";
import { useMyPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import ApyTd from "components/table/ApyTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import MyPoolActionsTd from "components/table/MyPoolActionsTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";

const MyPools: FC = () => {
  const myPools = useMyPools();

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
        width: 300,
      },
      {
        Header: "Combined APY",
        Tooltip: APY_NOTICE,
        Cell: ({ row }: any) => <ApyTd row={row} />,
        accessor: "combinedApy",
        width: 175,
        sortType: (a, b) => a.original.apy.total - b.original.apy.total,
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
        width: 175,
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original.myLiquidityInUst} />
        ),
        accessor: "myLiquidityInUst",
        width: 175,
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
    <Card noPadding>
      <PoolTable
        data={myPools}
        columns={columns}
        emptyMsg="You need to add liquidity first."
        sortBy="totalLiquidityInUst"
      />
    </Card>
  );
};

export default MyPools;
