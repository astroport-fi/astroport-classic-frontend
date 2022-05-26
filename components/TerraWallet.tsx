import React, { FC } from "react";
import { detect } from "detect-browser";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { Link, Text, HStack, chakra, useDisclosure } from "@chakra-ui/react";

import ConnectWalletModal from "components/modals/ConnectWalletModal";
import WalletInfoPopover from "components/popovers/WalletInfoPopover";
import TerraIcon from "components/icons/TerraIcon";
import ChromeIcon from "components/icons/ChromeIcon";
import UnderlineButton from "components/UnderlineButton";

const TerraWallet: FC<{ header?: boolean }> = ({ header = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();
  const browser = detect();

  // browser logic needs to be updated. should use ua-parser-js to detect browser/device
  const isChrome = [
    "chrome",
    "opera",
    "edge",
    "edge-chromium",
    "ios",
    "android",
  ].includes(browser?.name || "");

  if (header) {
    if (!isChrome) {
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
          flexShrink="0"
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
          flexShrink="0"
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
  } else {
    if (status === WalletStatus.WALLET_CONNECTED) {
      return null;
    }

    return (
      <>
        <UnderlineButton
          textAlign="left"
          p="0"
          fontWeight="500"
          color="brand.purpleAlt"
          fontSize="0.875rem"
          onClick={onOpen}
        >
          Connect Wallet
        </UnderlineButton>
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
};

export default TerraWallet;
