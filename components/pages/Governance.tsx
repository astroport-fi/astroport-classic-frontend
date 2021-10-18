import React from "react";
import { Box, HStack, Text, Button, Flex, Divider } from "@chakra-ui/react";
import Link from "next/link";

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

      <HStack spacing="8" mt="12">
        <Card flex="1">
          <Text fontWeight="500" mb="4">
            About Governance
          </Text>
          <Text variant="light" fontSize="xs">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. [Read More]
          </Text>
          <Button type="button" variant="primary" mt="6">
            Go to Forum
          </Button>
        </Card>
        <Card flex="1">
          <Flex justify="space-between">
            <Box>
              <Text fontWeight="500" fontSize="xl">
                {fromTerraAmount(astroBalance, "0,0.00")}
              </Text>
              <Text variant="light">Astro in my Wallet</Text>
            </Box>
            <Box textAlign="right">
              <Text fontWeight="500" fontSize="xl">
                {fromTerraAmount(xAstroBalance, "0,0.00")}
              </Text>
              <Text variant="light">My staked xAstro</Text>
            </Box>
          </Flex>

          <Divider bg="white.200" my="8" />

          <Flex justify="center" mb="6">
            <Link href="/governance/stake" passHref>
              <Button as="a" type="button" variant="primary">
                Stake Astro
              </Button>
            </Link>
          </Flex>
        </Card>
      </HStack>
    </Box>
  );
};

export default Governance;
