import React, { Fragment } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Divider,
  Link,
  Heading,
} from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import SummaryCard from "components/SummaryCard";
import Card from "components/Card";
import {
  NextLink,
  handleTinyAmount,
  handleBigPercentage,
  handleBigAndTinyAmount,
} from "modules/common";
import {
  useGovStakingRatio,
  useGovStakingAPY,
  useGovStakingBalances,
  useAstroMintRatio,
} from "../hooks";

const GovPageStake = () => {
  const { astroBalance, xAstroBalance, stakedAstroBalance } =
    useGovStakingBalances();
  const stakingRatio = useGovStakingRatio();
  const astroMintRatio = useAstroMintRatio();
  const stakingAPY = useGovStakingAPY();
  const astroDisabled = num(astroBalance).eq(0);
  const xAstroDisabled = num(xAstroBalance).eq(0);

  const data = [
    {
      label: "Total Staked ASTRO",
      value: fromTerraAmount(stakedAstroBalance, "0,0.00"),
    },
    {
      label: "APY",
      value: stakingAPY === 0 ? `>100k%` : `${handleBigPercentage(stakingAPY)}`,
    },
    {
      label: "ASTRO:xASTRO",
      value: astroMintRatio ? `1:${astroMintRatio}` : "-",
    },
    {
      label: "Protocol Staking Ratio",
      value: `${handleTinyAmount(stakingRatio)}%`,
    },
  ];

  return (
    <Box mt="24" color="white">
      <Heading px="2" mb="6" fontSize="xl">
        My ASTRO
      </Heading>

      <SummaryCard data={data} />

      <HStack spacing={8} mt="12" align="stretch">
        <Card
          flex={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="start"
        >
          <Text textStyle="h3">Get Involved</Text>
          <Text textStyle="small" variant="secondary" mt="4" mb="6">
            Stake ASTRO for xASTRO in order to receive a % of Astroport’s
            revenue.
            <br />
            To learn more about Astroport, join the community on Discord.
          </Text>
          <Button
            as="a"
            variant="primary"
            href="https://discord.gg/astroport"
            target="_blank"
            rel="noreferrer"
          >
            Join Discord
          </Button>
        </Card>
        <Card flex={1} display="flex" flexDir="column" justifyContent="center">
          <Flex justify="space-between">
            <Box>
              <Text textStyle="h3">
                {fromTerraAmount(astroBalance, "0,0.00")}
              </Text>
              <Text textStyle="small" variant="dimmed">
                ASTRO in My Wallet
              </Text>
            </Box>
            <Box textAlign="right">
              <Text textStyle="h3">
                {fromTerraAmount(xAstroBalance, "0,0.00")}
              </Text>
              <Text textStyle="small" variant="dimmed">
                My xASTRO Balance
              </Text>
            </Box>
          </Flex>

          <Divider bg="white.200" my="8" />

          <Flex justify="space-between">
            <NextLink
              href="/governance/stake"
              passHref
              isDisabled={
                astroDisabled || status === WalletStatus.WALLET_NOT_CONNECTED
              }
            >
              <Button
                as="a"
                type="button"
                variant="primary"
                isDisabled={
                  astroDisabled || status === WalletStatus.WALLET_NOT_CONNECTED
                }
              >
                Stake ASTRO
              </Button>
            </NextLink>
            <NextLink
              href="/governance/unstake"
              passHref
              isDisabled={
                xAstroDisabled || status === WalletStatus.WALLET_NOT_CONNECTED
              }
            >
              <Button
                as="a"
                type="button"
                variant="primary"
                isDisabled={
                  xAstroDisabled || status === WalletStatus.WALLET_NOT_CONNECTED
                }
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

export default GovPageStake;
