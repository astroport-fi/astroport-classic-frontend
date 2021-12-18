import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Image, chakra, Text, Box } from "@chakra-ui/react";
import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import MoneyStackIcon from "components/icons/MoneyStackIcon";
import HamburgerMenu from "components/HamburgerMenu";
import Notifications from "components/Notifications";

const Navbar: FC = () => {
  return (
    <Flex maxW="container.xl" m="0 auto" direction="column">
      <Flex justify="space-between" align="center">
        <Link href="/" passHref>
          <a>
            <Image src="/logo.svg" alt="WhiteWhale Logo" />
          </a>
        </Link>
        <HStack flex="1" px="16" spacing="12">
          <NavbarLink text="Swap" href="/" />
          <NavbarLink text="Pool" href="/pairs" />
          <NavbarLink text="Locked Liquidity" href="/locked-liquidity" />
          {/* <NavbarLink text="Governance" href="/governance" /> */}
          <NavbarLink text="Airdrop" href="/airdrop" />
        </HStack>
        <HStack spacing="4" justify="flex-end">
          <TerraWallet />
          <chakra.button
            color="white"
            bg="brand.lightBlue"
            py="2"
            px="3"
            borderRadius="full"
            mr="0.5"
            outline="none"
          >
            <HStack>
              <MoneyStackIcon width="1.25rem" height="1.25rem" />
              <Text>0.00</Text>
            </HStack>
          </chakra.button>
          <HamburgerMenu />
        </HStack>
      </Flex>
      <Box alignSelf="flex-end" position="relative">
        <Notifications />
      </Box>
    </Flex>
  );
};

export default Navbar;
