import React, { useMemo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { useAuctionPools } from "modules/auction";
import { useNotEnoughUSTBalanceToPayFees } from "modules/common";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import LockEndTd from "components/table/LockEndTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import RewardsTd from "components/table/RewardsTd";
import AuctionActionsTd from "components/table/AuctionActionsTd";

const MyAuctionLockedPool = () => {
  const auctionPools = useAuctionPools();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

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
        width: 250,
        accessor: "sortingAssets",
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            value={row.original.totalLiquidityInUst}
            format="0,0"
          />
        ),
        width: 125,
        accessor: "totalLiquidityInUst",
        disableGlobalFilter: true,
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original.myLiquidityInUst} />
        ),
        width: 125,
        accessor: "myLiquidityInUst",
        disableGlobalFilter: true,
      },
      {
        Header: "Unlockable Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original.myUnlockableLiquidityInUst} />
        ),
        width: 150,
        accessor: "myUnlockableLiquidityInUst",
        disableGlobalFilter: true,
      },
      {
        Header: "Claimable Rewards",
        Cell: ({ row }: any) => <RewardsTd rewards={row.original.rewards} />,
        width: 150,
        accessor: "rewards",
      },
      {
        Header: "Fully Unlocks On",
        Cell: ({ row }: any) => <LockEndTd row={row} />,
        width: 150,
        accessor: "lockEnd",
        disableGlobalFilter: true,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => (
          <AuctionActionsTd
            isClaimable={row.original.isClaimable}
            isClaimed={row.original.isClaimed}
            txFeeNotEnough={notEnoughUSTToPayFees}
            amount={row.original.amount}
          />
        ),
        accessor: "actions",
        flex: 1,
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  return (
    <Box>
      <CardHeader label="My Locked LP Tokens from Phase 2: ASTRO-UST Bootstrapping pool" />
      <Card>
        <Text textStyle="small" variant="secondary">
          Your ASTRO-UST LP tokens unlock linearly over 3 months after the end
          of the phase 2 deposit window.
        </Text>
      </Card>
      <Card overflow="auto" mt={6} noPadding>
        <PoolTable
          columns={columns}
          data={auctionPools}
          minW="1380px"
          emptyMsg="You didn't lock any positions."
          sortBy="totalUnlockedLiquidity"
        />
      </Card>
    </Box>
  );
};

export default MyAuctionLockedPool;
