import React, { FC } from "react";
import { detect } from "detect-browser";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { Link, Text, HStack, chakra, useDisclosure } from "@chakra-ui/react";

import ConnectWalletModal from "components/modals/ConnectWalletModal";
import WalletInfoPopover from "components/popovers/WalletInfoPopover";
import TerraIcon from "components/icons/TerraIcon";
import ChromeIcon from "components/icons/ChromeIcon";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();
  const browser = detect();

  if (
    !["chrome", "opera", "edge", "edge-chromium", "ios", "android"].includes(
      browser?.name
    )
  ) {
    return (
      <Link
        href="https://www.google.com/chrome/"
        isExternal
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        bg="white"
        py="2"
        px="4"
        borderRadius="full"
      >
        <HStack spacing="3">
          <ChromeIcon width="1.25rem" height="1.25rem" />
          <Text fontSize="xs">Get Chrome</Text>
        </HStack>
      </Link>
    );
  }

  if (status === WalletStatus.WALLET_CONNECTED) {
    return <WalletInfoPopover />;
  }

  return (
    <>
      <chakra.button
        type="button"
        color="white"
        onClick={onOpen}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        _hover={{
          bg: "brand.purple",
        }}
        bg="brand.lightBlue"
        py="2"
        px="4"
        borderRadius="full"
      >
        <HStack spacing="3">
          <TerraIcon width="1.25rem" height="1.25rem" />
          <Text fontSize="sm">Connect your wallet</Text>
        </HStack>
      </chakra.button>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
