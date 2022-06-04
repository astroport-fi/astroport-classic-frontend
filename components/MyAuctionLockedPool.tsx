import React, { FC, useMemo } from "react";
import useAddress from "hooks/useAddress";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { AuctionPoolsPool } from "types/common";
import { useAuctionPools } from "modules/auction";
import { useNotEnoughUSTBalanceToPayFees } from "modules/common";
import TerraWallet from "components/TerraWallet";
import CardHeader from "components/CardHeader";
import Card from "components/Card";
import CardMobile from "components/CardMobile";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import LockEndTd from "components/table/LockEndTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import RewardsTd from "components/table/RewardsTd";
import AuctionActionsTd from "components/table/AuctionActionsTd";

import { PoolFeed } from "components/feed";

const PHASE_2_DESC =
  "Your ASTROC-USTC LP tokens unlock linearly over 3 months after the end of the phase 2 deposit window.";

const sortByTotalLiqudityFn = (a: any, b: any): any => {
  return b.totalLiquidityInUst - a.totalLiquidityInUst;
};

const MobileComponent: FC<{
  pools: AuctionPoolsPool[];
  txFeeNotEnough: boolean;
}> = ({ pools, txFeeNotEnough }) => {
  const poolsSorted = pools.sort(sortByTotalLiqudityFn);
  const { status } = useWallet();

  return (
    <>
      {(status === WalletStatus.WALLET_NOT_CONNECTED ||
        poolsSorted.length === 0) && (
        <CardMobile>
          {status === WalletStatus.WALLET_NOT_CONNECTED && (
            <>
              <Flex mb="2" color="white.500" fontSize="sm">
                Please connect your wallet.
              </Flex>
              <TerraWallet header={false} />
            </>
          )}
          {status !== WalletStatus.WALLET_NOT_CONNECTED &&
            poolsSorted.length === 0 && (
              <Flex
                color="white.500"
                fontSize="sm"
              >{`You didn't lock any positions.`}</Flex>
            )}
        </CardMobile>
      )}
      <PoolFeed
        type="auctionpools"
        pools={poolsSorted}
        txFeeNotEnough={txFeeNotEnough}
      />
    </>
  );
};

const Component: FC<{
  address: string;
  pools: AuctionPoolsPool[];
  txFeeNotEnough: boolean;
}> = ({ address, pools, txFeeNotEnough }) => {
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
        Cell: ({ row }: any) => (
          <AuctionActionsTd
            isClaimable={row.original.isClaimable}
            isClaimed={row.original.isClaimed}
            txFeeNotEnough={txFeeNotEnough}
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
    <Card overflow="auto" mt={6} noPadding>
      <PoolTable
        columns={columns}
        data={pools}
        minW={address.length !== 0 ? "1380px" : ""}
        renderFilters={address.length !== 0}
        emptyMsg="You didn't lock any positions."
        sortBy="totalUnlockedLiquidity"
      />
    </Card>
  );
};

const MyAuctionLockedPool = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const address = useAddress();
  const pools = useAuctionPools();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  return (
    <Box>
      <CardHeader label="My Locked LP Tokens from Phase 2: ASTROC-UST Bootstrapping pool" />
      {isMobile ? (
        <>
          <Text textStyle="small" color="white.400" px="2" mb="5">
            {PHASE_2_DESC}
          </Text>
          <MobileComponent
            pools={pools}
            txFeeNotEnough={notEnoughUSTToPayFees}
          />
        </>
      ) : (
        <>
          <Card mb={isMobile ? "5" : "initial"}>
            <Text textStyle="small" variant="secondary">
              {PHASE_2_DESC}
            </Text>
          </Card>
          <Component
            address={address || ""}
            pools={pools}
            txFeeNotEnough={notEnoughUSTToPayFees}
          />
        </>
      )}
    </Box>
  );
};

export default MyAuctionLockedPool;
