import React, { FC, useMemo } from "react";
import { APY_NOTICE } from "constants/constants";
import { useAllPools } from "modules/pool";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import ApyTd from "components/table/ApyTd";

const OtherPools: FC = () => {
  const allPools = useAllPools();

  const columns = useMemo(
    () => [
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
        disableSortBy: true,
      },
      {
        Header: "Combined APY",
        Tooltip: APY_NOTICE,
        Cell: ({ row }: any) => <ApyTd row={row} />,
        accessor: "combinedApy",
        width: 200,
        sortType: (a, b) => a.original.apy.total - b.original.apy.total,
      },
      {
        Header: "Total Liquidity",
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
        width: 160,
        flex: 1,
        disableSortBy: true,
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

export default OtherPools;
