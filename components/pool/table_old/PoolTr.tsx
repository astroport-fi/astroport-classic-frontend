import React, { FC, Fragment, useMemo, useState } from "react";
import { Flex, Box, Text, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";

import Tr from "components/Tr";
import Td from "components/Td";
import Graph from "components/graph/Graph";
import { enumToArray } from "modules/pool";
import LpCard from "components/common/LpCard";

enum TimeFilter {
  FiveMinutes,
  FifteenMinutes,
  ThirteenMinutes,
  OneHour,
  FourHours,
  OneDay,
  OneWeek,
}

const buttonTitleByTimeFilters: Record<TimeFilter, string> = {
  [TimeFilter.FiveMinutes]: "05M",
  [TimeFilter.FifteenMinutes]: "15M",
  [TimeFilter.ThirteenMinutes]: "30M",
  [TimeFilter.OneHour]: "1HR",
  [TimeFilter.FourHours]: "4HR",
  [TimeFilter.OneDay]: "1D",
  [TimeFilter.OneWeek]: "1W",
};

type Props = {
  row: any;
};

const PoolTr: FC<Props> = ({ row }) => {
  const { contract_addr } = row.original;
  const [timeFilter, setTimeFilter] = useState(TimeFilter[4]);

  const rightButtons = useMemo(
    () =>
      enumToArray(TimeFilter).map((filter) => ({
        onClick: () => setTimeFilter(filter),
        isActive: timeFilter === filter,
        type: filter,
        title: buttonTitleByTimeFilters[TimeFilter[filter]],
      })),
    [timeFilter]
  );

  const details = useMemo(() => {
    return [
      { label: "Reward till", value: "11/17/21" },
      { label: "Pool", value: "89 Anc / day" },
      { label: "Fees (24hr)", value: "$ 17,110.90" },
      { label: "Total Rewards", value: "$ 40,411 /day" },
    ];
  }, []);

  const data = useMemo(() => {
    return Array(50)
      .fill("")
      .map((el, index) => ({
        x: index,
        y: Math.random(),
      }));
  }, []);

  return (
    <Fragment>
      <Tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          return (
            <Td key={cell} {...cell.getCellProps()}>
              {cell.render("Cell")}
            </Td>
          );
        })}
      </Tr>

      {row.isExpanded && (
        <Tr bg="blackAlpha.400">
          <Td>
            <Flex>
              <Box flex="3">
                <Graph points={data} rightButtons={rightButtons} />
              </Box>
              <Box flex="1" pl="8" color="white">
                <Text mb="3" textStyle="medium">
                  LP Token Farming
                </Text>

                <Text mb="2" textStyle="small" variant="secondary">
                  Reward (Rewards + Fee APY)
                </Text>
                <LpCard token="uusd" apy="17.11%" />

                <Text mt="6" mb="2" textStyle="small" variant="secondary">
                  Breakdown
                </Text>
                <Box
                  color="white"
                  borderWidth="1px"
                  borderRadius="xl"
                  borderColor="white.200"
                  bg="whiteAlpha.100"
                  px="4"
                  py="4"
                >
                  {details.map((detail) => {
                    return (
                      <HStack key={detail.label} justify="space-between" mb="1">
                        <Text textStyle="small" variant="secondary">
                          {detail.label}
                        </Text>
                        <Text textStyle="medium">{detail.value}</Text>
                      </HStack>
                    );
                  })}
                </Box>

                <Flex align="center" justify="center" mt="6">
                  <Link href={`/pools/${contract_addr}/stake`} passHref>
                    <Button variant="primary" as="a">
                      Stake Lp Token
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </Flex>
          </Td>
        </Tr>
      )}
    </Fragment>
  );
};

export default PoolTr;
