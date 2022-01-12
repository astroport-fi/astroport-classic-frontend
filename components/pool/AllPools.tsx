import React, { FC, useMemo } from "react";

import { useAllPools } from "modules/pool";

import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import RewardedIcon from "components/icons/RewardedIcon";

const AllPools: FC = () => {
  const allPools = useAllPools();

  const columns = useMemo(
    () => [
      // {
      //   id: "reward-icon",
      //   width: 8,
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
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
        width: 80,
      },
    ],
    []
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

export default AllPools;
