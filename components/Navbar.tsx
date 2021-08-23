import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Image, chakra, Text } from "@chakra-ui/react";

import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import MenuIcon from "components/icons/MenuIcon";
import MoneyStackIcon from "components/icons/MoneyStackIcon";

const Navbar: FC = () => {
  return (
    <Flex justify="space-between" align="center" maxW="container.xl" m="0 auto">
      <Link href="/" passHref>
        <a>
          <Image src="/logo.svg" alt="WhiteWhale Logo" />
        </a>
      </Link>
      <Flex justify="space-between" align="center" flex="1" px="16">
        <NavbarLink text="Swap" href="/swap" />
        <NavbarLink text="Pools" href="/pools" />
        <NavbarLink text="Dashboard" href="/dashboard" />
        <NavbarLink text="Governance" href="/gov" />
        <NavbarLink text="Token Sale" href="/sale" />
        <NavbarLink text="Airdrop" href="/airdrop" />
      </Flex>
      <HStack spacing="4" justify="flex-end">
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
        <TerraWallet />
        <chakra.button color="white" outline="none">
          <MenuIcon />
        </chakra.button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
