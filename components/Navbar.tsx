import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Image, Box } from "@chakra-ui/react";

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
        <RewardCenter />
      </>
    );
  };

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
          {renderRight()}
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
