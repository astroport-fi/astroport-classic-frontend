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

const Governance = () => {
  const { astroToken, xAstroToken } = useContracts();
  const astroBalance = useBalance(astroToken);
  const xAstroBalance = useBalance(xAstroToken);

  const data = [
    { label: "Total staked xAstro", value: "x,xxx,xxx.00" },
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.{" "}
            <Link href="#" color="brand.lightPurple">
              Read More
            </Link>
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
                Astro in my Wallet
              </Text>
            </Box>
            <Box textAlign="right">
              <Text textStyle="h3">
                {fromTerraAmount(xAstroBalance, "0,0.00")}
              </Text>
              <Text textStyle="small" variant="dimmed">
                My staked xAstro
              </Text>
            </Box>
          </Flex>

          <Divider bg="white.200" my="8" />

          <Flex justify="center">
            <NextLink href="/governance/stake" passHref>
              <Button as="a" type="button" variant="primary">
                Stake Astro
              </Button>
            </NextLink>
          </Flex>
        </Card>
      </HStack>
    </Box>
  );
};

export default Governance;
