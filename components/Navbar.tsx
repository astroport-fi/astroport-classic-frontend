import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Image, chakra, Text } from "@chakra-ui/react";
import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import MoneyStackIcon from "components/icons/MoneyStackIcon";
import HamburgerMenu from "components/HamburgerMenu";

const Navbar: FC = () => {
  return (
    <Flex justify="space-between" align="center" maxW="container.xl" m="0 auto">
      <Link href="/" passHref>
        <a>
          <Image src="/logo.svg" alt="WhiteWhale Logo" />
        </a>
      </Link>
      <HStack flex="1" px="16" spacing="12">
        <NavbarLink text="Swap" href="/swap" />
        <NavbarLink text="Pools" href="/pairs" />
        {/* <NavbarLink text="Governance" href="/governance" /> */}
        <NavbarLink text="Airdrop" href="/airdrop" />
      </HStack>
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
        <HamburgerMenu />
      </HStack>
    </Flex>
  );
};

export default Navbar;
