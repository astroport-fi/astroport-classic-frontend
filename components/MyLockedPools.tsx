import React, { useMemo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { useAstroPools } from "modules/lockdrop";
import { useNotEnoughUSTBalanceToPayFees } from "modules/common";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import LockEndTd from "components/table/LockEndTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import RewardsTd from "components/table/RewardsTd";
import MyLockActionsTd from "components/table/MyLockActionsTd";
import { useAddress } from "@arthuryeti/terra";

const MyLockedPools = () => {
  const address = useAddress();
  const pools = useAstroPools();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
            contract={row.original.contract}
          />
        ),
        width: 250,
        accessor: "sortingAssets",
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
        width: 125,
        accessor: "myLiquidityInUst",
        disableGlobalFilter: true,
      },
      {
        Header: "Claimable Rewards",
        Cell: ({ row }: any) => <RewardsTd rewards={row.original.rewards} />,
        width: 150,
        accessor: "rewards",
        disableGlobalFilter: true,
      },
      {
        Header: "Fully Unlocks On",
        Cell: ({ row }: any) => <LockEndTd row={row} />,
        accessor: "lockEnd",
        width: 150,
        disableGlobalFilter: true,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => (
          <MyLockActionsTd
            name={row.original.name}
            duration={row.original.duration}
            isClaimable={row.original.isClaimable}
            astroLpToken={row.original.astroLpToken}
            isClaimed={row.original.isClaimed}
            txFeeNotEnough={notEnoughUSTToPayFees}
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
      <CardHeader label="My Locked LP Tokens from Phase 1 : The Lockdrop" />
      <Card>
        <Text textStyle="small" variant="secondary">
          Your lockdrop positions will unlock on the dates you specified when
          you made your deposit.
        </Text>
      </Card>
      <Card overflow="auto" mt={6} noPadding>
        <PoolTable
          columns={columns}
          data={pools}
          emptyMsg="You didn't lock any positions."
          sortBy="totalLiquidityInUst"
          renderFilters={address.length !== 0}
        />
      </Card>
    </Box>
  );
};

export default MyLockedPools;
