import React from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Divider,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

import SummaryCard from "components/SummaryCard";
import Card from "components/Card";
import { useContracts } from "modules/common";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

const GovernancePage = () => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const astroBalance = useBalance(astroToken);
  const xAstroBalance = useBalance(xAstroToken);
  const govXAstroBalance = useBalance(astroToken, staking);

  const data = [
    {
      label: "Total staked xAstro",
      value: fromTerraAmount(govXAstroBalance, "0,0.00"),
    },
    { label: "APY", value: "xx.xx%" },
    { label: "Protocol Staking Ratio", value: "xx.xx%" },
  ];

  return (
    <Box w="container.xl" m="0 auto" pt="12" pb="64">
      <SummaryCard data={data} />

      <HStack spacing={8} mt="12" align="stretch">
        <Card
          flex={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="start"
        >
          <Text textStyle="medium">About Governance</Text>
          <Text textStyle="small" variant="secondary" mt={4}>
            Stake ASTRO for xASTRO in order to participate in Astroport
            governance. To learn more about existing proposals, or to get
            feedback on a proposal you’re considering, visit the Astroport
            forums.
          </Text>
          <Button variant="primary" mt={6}>
            Go to Forum
          </Button>
        </Card>
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
            <NextLink href="/governance/stake" passHref>
              <Button as="a" type="button" variant="primary">
                Stake ASTRO
              </Button>
            </NextLink>
            <NextLink href="/governance/unstake" passHref>
              <Button as="a" type="button" variant="primary">
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
