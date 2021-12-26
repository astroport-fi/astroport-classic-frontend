import React, { FC, useMemo } from "react";

import { useAllPools } from "modules/pool";

import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberWithUstTd from "components/table/NumberWithUstTd";
import ActionsTd from "components/table/ActionsTd";
import RewardedIcon from "components/icons/RewardedIcon";

const AllPools: FC = () => {
  const allPools = useAllPools();

  const columns = useMemo(
    () => [
      {
        id: "reward-icon",
        width: 0,
        Cell: () => <RewardedIcon color="#59B7DD" />,
      },
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
          />
        ),
        accessor: "name",
        width: 300,
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberWithUstTd
            value={row.original.myLiquidity}
            valueInUst={row.original.myLiquidityInUst}
          />
        ),
        accessor: "myLiquidity",
        width: 200,
      },
      {
        Header: "Liquidity",
        Cell: ({ row }: any) => (
          <NumberWithUstTd
            value={row.original.totalLiquidity}
            valueInUst={row.original.totalLiquidityInUst}
          />
        ),
        accessor: "totalLiquidity",
        width: 200,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
        width: 80,
      },
    ],
    []
  );

  return (
    <Card noPadding>
      <PoolTable data={allPools} columns={columns} />
    </Card>
  );
};

export default AllPools;
