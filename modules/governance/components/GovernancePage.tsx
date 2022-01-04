import React, { Fragment } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Divider,
  Link,
} from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import SummaryCard from "components/SummaryCard";
import Card from "components/Card";
import { useContracts, NextLink } from "modules/common";
import { useGovStakingRatio } from "../hooks";

const GovernancePage = () => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const astroBalance = useBalance(astroToken);
  const xAstroBalance = useBalance(xAstroToken);
  const govXAstroBalance = useBalance(astroToken, staking);
  const stakingRatio = useGovStakingRatio();
  const astroDisabled = num(astroBalance).eq(0);
  const xAstroDisabled = num(xAstroBalance).eq(0);

  const data = [
    {
      label: "Total Staked ASTRO",
      value: fromTerraAmount(govXAstroBalance, "0,0.00"),
    },
    { label: "Protocol Staking Ratio", value: `${stakingRatio}%` },
  ];

  return (
    <Box mt="12">
      <SummaryCard data={data} />

      <HStack spacing={8} mt="12" align="stretch">
        {/* <Card
          flex={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="start"
        >
          <Text textStyle="medium">About Governance</Text>
          <Text textStyle="small" variant="secondary" mt={4}>
            Stake ASTRO for xASTRO in order to participate in Astroport
            staking. To learn more about existing proposals, or to get
            feedback on a proposal you’re considering, visit the Astroport
            forums.
          </Text>
          <Button variant="primary" mt={6}>
            Go to Forum
          </Button>
        </Card> */}
        <Card flex={1} display="flex" flexDir="column" justifyContent="center">
          <Flex justify="space-between">
            <Box>
              <Text textStyle="h3">
                {fromTerraAmount(astroBalance, "0,0.00")}
              </Text>
              <Text textStyle="small" variant="dimmed">
                ASTRO in my Wallet
              </Text>
            </Box>
            <Box textAlign="right">
              <Text textStyle="h3">
                {fromTerraAmount(xAstroBalance, "0,0.00")}
              </Text>
              <Text textStyle="small" variant="dimmed">
                My staked xASTRO
              </Text>
            </Box>
          </Flex>

          <Divider bg="white.200" my="8" />

          <Flex justify="space-between">
            <NextLink href="/staking/stake" passHref isDisabled={astroDisabled}>
              <Button
                as="a"
                type="button"
                variant="primary"
                isDisabled={astroDisabled}
              >
                Stake ASTRO
              </Button>
            </NextLink>
            <NextLink
              href="/staking/unstake"
              passHref
              isDisabled={xAstroDisabled}
            >
              <Button
                as="a"
                type="button"
                variant="primary"
                isDisabled={xAstroDisabled}
              >
                Unstake xASTRO
              </Button>
            </NextLink>
          </Flex>
        </Card>
      </HStack>
    </Box>
  );
};

export default GovernancePage;
