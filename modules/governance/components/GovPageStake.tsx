import React from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import {
  Box,
  Grid,
  Text,
  Button,
  Flex,
  Divider,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { fromTerraAmount } from "libs/terra";
import num from "libs/num";
import {
  ASTRO_DISCORD_LINK,
  ASTRO_FORUM_LINK,
  MOBILE_MAX_WIDTH,
} from "constants/constants";
import SummaryCard from "components/SummaryCard";
import Card from "components/Card";
import { NextLink, handleBigPercentage } from "modules/common";
import {
  composeAstroRatioDisplay,
  composeProtocolRatioDisplay,
} from "modules/governance/helpers";
import {
  useGovStakingRatio,
  useGovStakingAPY,
  useGovStakingBalances,
  useAstroMintRatio,
} from "modules/governance";

const GovPageStake = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const {
    astroBalance,
    xAstroBalance,
    stakedAstroBalance,
    xAstroSupply,
    astroCircSupply,
  } = useGovStakingBalances({
    getAstroBalance: true,
    getXAstroBalance: true,
    getStakedAstroBalance: true,
    getAstroCircSupply: true,
    getXAstroSupply: true,
  });
  const stakingRatio = useGovStakingRatio();
  const astroMintRatio = useAstroMintRatio();
  const stakingAPY = useGovStakingAPY();
  const astroDisabled = num(astroBalance).eq(0);
  const xAstroDisabled = num(xAstroBalance).eq(0);
  const { status } = useWallet();

  const data = [
    {
      label: "Total Staked ASTRO",
      value: fromTerraAmount(stakedAstroBalance, "0,0.00"),
    },
    {
      label: "APY",
      value:
        stakingAPY !== null
          ? stakingAPY === 0
            ? `>100k%`
            : `${handleBigPercentage(stakingAPY)}`
          : `-`,
      tooltip:
        "The APY (UST denominated) is calculated using the average daily ASTRO amount going to xASTRO over the last 7 days. It is derived from fees collected into the maker contract, not from ASTRO sent to stakers and it excludes any fees accrued prior to the xASTRO launch.",
    },
    {
      label: "xASTRO:ASTRO",
      value: composeAstroRatioDisplay(astroMintRatio),
    },
    {
      label: "Protocol Staking Ratio",
      value: composeProtocolRatioDisplay(
        stakedAstroBalance,
        xAstroSupply,
        astroCircSupply,
        stakingRatio
      ),
    },
  ];

  return (
    <>
      <Box px={["1", null, "6"]} mb="4" mt={["4", null, "12"]}>
        <Heading fontSize="xl">My ASTRO</Heading>
      </Box>

      <SummaryCard data={data} />

      <Grid
        mt="12"
        templateColumns={["auto", "auto", "auto", "repeat(2, 1fr)"]}
        gap={8}
      >
        <Card
          order={[2, 2, 2, 1]}
          flex={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          <Text textStyle={["lg", "lg", "h3"]}>Get Involved</Text>
          <Text textStyle="small" variant="secondary" mt="4" mb="6">
            Stake ASTRO for xASTRO in order to receive a % of Astroport smart
            contract fees.
            <br />
            {isMobile && <br />}
            To learn more about Astroport, join the community on Discord or on
            the Forum.
          </Text>
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            gap={isMobile ? "6" : "0"}
            justify="space-between"
          >
            <Button
              as="a"
              variant="primary"
              href={ASTRO_DISCORD_LINK}
              target="_blank"
              rel="noreferrer"
            >
              Join Discord
            </Button>
            <Button
              as="a"
              variant="primary"
              href={ASTRO_FORUM_LINK}
              target="_blank"
              rel="noreferrer"
            >
              Join the Forum
            </Button>
          </Flex>
        </Card>
        <Card
          order={[1, 1, 1, 2]}
          flex={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
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

          <Flex
            flexDirection={isMobile ? "column" : "row"}
            gap={isMobile ? "6" : "0"}
            justify="space-between"
          >
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
      </Grid>
    </>
  );
};

export default GovPageStake;
