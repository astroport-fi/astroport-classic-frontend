import React, { FC, useMemo, useState } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { AstroPoolsPool } from "types/common";
import { useAstroPools } from "modules/lockdrop";
import {
  useNotEnoughUSTBalanceToPayFees,
  searchTokenAdddres,
} from "modules/common";
import TerraWallet from "components/TerraWallet";
import CardHeader from "components/CardHeader";
import Card from "components/Card";
import CardMobile from "components/CardMobile";
import Search from "components/common/Search";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import LockEndTd from "components/table/LockEndTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import RewardsTd from "components/table/RewardsTd";
import MyLockActionsTd from "components/table/MyLockActionsTd";

import { PoolFeed } from "components/feed";
import useAddress from "hooks/useAddress";

const PHASE_1_DESC =
  "Your lockdrop positions will unlock on the dates you specified when you made your deposit.";

const sortByTotalLiqudityFn = (a: any, b: any): any => {
  return b.totalLiquidityInUst - a.totalLiquidityInUst;
};

const MobileComponent: FC<{
  pools: AstroPoolsPool[];
  txFeeNotEnough: boolean;
}> = ({ pools, txFeeNotEnough }) => {
  const poolsSorted = pools.sort(sortByTotalLiqudityFn);
  const { status } = useWallet();
  const [filter, setFilter] = useState("");
  const [filteredPools, setFilteredPools] = useState<AstroPoolsPool[]>([]);
  const initialFocusRef = React.useRef();

  const searchPools = (searchTerm: string) => {
    setFilteredPools(searchTokenAdddres(searchTerm, poolsSorted));
    setFilter(searchTerm);
  };

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
      {poolsSorted.length > 0 && (
        <Flex mb="4">
          <Search
            color="white"
            iconStyle={{ color: "white" }}
            borderColor="brand.deepBlue"
            placeholder="Search Token"
            onChange={(e) => searchPools(e.target.value)}
            variant="search"
            // @ts-ignore
            ref={initialFocusRef}
          />
        </Flex>
      )}
      {filter.length > 0 && filteredPools.length == 0 && (
        <CardMobile>
          <Text color="white.500" fontSize="sm">
            No search results.
          </Text>
        </CardMobile>
      )}
      <PoolFeed
        type="lockedpools"
        pools={filter.length > 0 ? filteredPools : poolsSorted}
        txFeeNotEnough={txFeeNotEnough}
      />
    </>
  );
};

const Component: FC<{
  address: string;
  pools: AstroPoolsPool[];
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
            txFeeNotEnough={txFeeNotEnough}
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
        emptyMsg="You didn't lock any positions."
        sortBy="totalLiquidityInUst"
        renderFilters={address.length !== 0}
      />
    </Card>
  );
};

const MyLockedPools = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const address = useAddress() || "";
  const pools = useAstroPools();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  return (
    <Box>
      <CardHeader label="My Locked LP Tokens from Phase 1 : The Lockdrop" />
      {isMobile ? (
        <>
          <Text textStyle="small" color="white.400" px="2" mb="5">
            {PHASE_1_DESC}
          </Text>
          <MobileComponent
            pools={pools}
            txFeeNotEnough={notEnoughUSTToPayFees}
          />
        </>
      ) : (
        <>
          <Card>
            <Text textStyle="small" variant="secondary">
              {PHASE_1_DESC}
            </Text>
          </Card>
          <Component
            address={address}
            pools={pools}
            txFeeNotEnough={notEnoughUSTToPayFees}
          />
        </>
      )}
    </Box>
  );
};

export default MyLockedPools;
