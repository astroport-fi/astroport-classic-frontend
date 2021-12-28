import React, { FC } from "react";
import Link from "next/link";
import { Container, Flex, HStack, Image, Box } from "@chakra-ui/react";

import { useAstroswap } from "modules/common";

import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import HamburgerMenu from "components/HamburgerMenu";
import Notifications from "components/Notifications";
import RewardCenter from "components/RewardCenter";
import PendingNotifications from "./PendingNotifications";

const Navbar: FC = () => {
  const { notifications } = useAstroswap();
  const pending = notifications.items?.filter(
    (item) => item.type === "started"
  );

  const renderRight = () => {
    if (pending?.length > 0) {
      return <PendingNotifications items={pending} />;
    }

    return (
      <>
        <TerraWallet />
        <Box display={["none", null, null, "block"]}>
          <RewardCenter />
        </Box>
      </>
    );
  };

  return (
    <Container
      maxW="container.xl"
      px={["6", null, "12"]}
      pt="8"
      position="relative"
      centerContent
    >
      <Flex w="100%" justify="space-between" align="center">
        <Box flexShrink={0}>
          <Link href="/" passHref>
            <a>
              <Image src="/logo.svg" alt="WhiteWhale Logo" />
            </a>
          </Link>
        </Box>
        <Box display={["none", null, null, "block"]} flex="1">
          <HStack flex="1" px="16" spacing="12">
            <NavbarLink text="Swap" href="/swap" />
            <NavbarLink text="Pool" href="/pools" />
            <NavbarLink text="Locked Liquidity" href="/locked-liquidity" />
            {/* <NavbarLink text="Governance" href="/governance" /> */}
            <NavbarLink text="Airdrop" href="/airdrop" />
          </HStack>
        </Box>
        <HStack spacing="4" justify="flex-end">
          {renderRight()}
          <HamburgerMenu />
        </HStack>
      </Flex>
      <Box alignSelf="flex-end" position="relative">
        <Notifications />
      </Box>
    </Container>
  );
};

export default Navbar;
