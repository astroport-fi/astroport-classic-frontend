import React, { FC, useMemo } from "react";

import { useMyPools } from "modules/pool";

import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import MyPoolActionsTd from "components/table/MyPoolActionsTd";

const MyPools: FC = () => {
  const myPools = useMyPools();

  const columns = useMemo(
    () => [
      // {
      //   id: "reward-icon",
      //   width: 8,
      //   flexGrow: 0,
      //   Cell: () => <RewardedIcon color="#59B7DD" w="4" h="4" mr="4" />,
      // },
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
          />
        ),
        accessor: "name",
        width: 200,
        flexGrow: 0,
        disableSortBy: true,
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original.myLiquidityInUst} />
        ),
        accessor: "myLiquidityInUst",
        width: 200,
      },
      {
        Header: "Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original.totalLiquidityInUst} />
        ),
        accessor: "totalLiquidityInUst",
        width: 200,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => <MyPoolActionsTd data={row.original} />,
        accessor: "actions",
        width: 80,
        disableSortBy: true,
      },
    ],
    []
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
