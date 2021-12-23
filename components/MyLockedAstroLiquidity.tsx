import React, { useMemo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { useAstroPools } from "modules/lockdrop";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import LockEndTd from "components/table/LockEndTd";
import NumberWithUstTd from "components/table/NumberWithUstTd";
import MyActionsTd from "components/table/MyActionsTd";
import RewardedIcon from "components/icons/RewardedIcon";

const MyLockedAstroLiquidity = () => {
  const pools = useAstroPools();
  const columns = useMemo(
    () => [
      // {
      //   id: "reward-icon",
      //   width: 0,
      //   Cell: () => <RewardedIcon color="#59B7DD" />,
      // },

      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd assets={row.original.assets} />,
        accessor: "name",
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
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => (
          <NumberWithUstTd
            value={row.original.totalLiquidity}
            valueInUst={row.original.totalLiquidityInUst}
          />
        ),
        accessor: "totalLockedAstroportLiquidity",
      },
      {
        Header: "Fully unlocks on",
        Cell: ({ row }: any) => <LockEndTd row={row} />,
        accessor: "lockEnd",
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => (
          <MyActionsTd
            name={row.original.name}
            duration={row.original.duration}
          />
        ),
        accessor: "actions",
        width: 80,
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
          you made your deposit.{" "}
          <Link
            isExternal
            target="_blank"
            href="https://docs.astroport.fi/astroport/workstation/lockdrop/phase-1"
            color="brand.lightPurple"
          >
            Read More
          </Link>
        </Text>
      </Card>
      <Card mt={6} noPadding>
        <PoolTable
          columns={columns}
          data={pools}
          emptyMsg="You didn't lock any positions."
        />
      </Card>
    </Box>
  );
};

export default MyLockedAstroLiquidity;
