import React, { FC } from "react";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import { Text, HStack, Flex, chakra, Image } from "@chakra-ui/react";
import Modal from "components/modals/Modal";
import TerraExtensionIcon from "components/icons/TerraExtensionIcon";
import XDefiIcon from "components/icons/XDefiIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type WalletOptions = {
  identifier: string;
  name: string;
  icon: string;
  isInstalled?: boolean;
  walletAction: () => void;
};

const getIconImg = (identifier: string, icon: string) => {
  if (identifier === "terra") {
    return <TerraExtensionIcon />;
  } else if (identifier == "xdefi-wallet") {
    return <XDefiIcon />;
  }

  return <Image src={icon} htmlWidth="24" alt="" />;
};

const ConnectWalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect, availableInstallations, availableConnections } = useWallet();

  const wallets: WalletOptions[] = [
    ...availableConnections
      .filter(({ type }) => type !== ConnectType.READONLY)
      .map(({ type, icon, name, identifier }) => ({
        identifier,
        name,
        icon,
        isInstalled: true,
        walletAction: () => {
          connect(type, identifier);
        },
      })),
    ...availableInstallations
      .filter(({ type }) => type !== ConnectType.READONLY)
      .map(({ icon, name, url, identifier }) => ({
        identifier,
        name: "Install " + name,
        icon,
        isInstalled: true,
        walletAction: () => {
          window.open(url, "_blank");
        },
      })),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect to a wallet">
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
      >
        {Object.entries(wallets).map(([key, values]) => (
          <chakra.button
            key={key}
            transition="0.2s all"
            p="6"
            borderRadius="xl"
            bg="brand.purple"
            color="white"
            width="100%"
            mb="4"
            _hover={{
              bg: "white",
              color: "brand.dark",
            }}
            d={["none", "block"]}
            onClick={() => {
              onClose();
              values.walletAction();
            }}
          >
            <HStack justify="space-between">
              <Text>{values.name}</Text>
              {getIconImg(values.identifier, values.icon)}
            </HStack>
          </chakra.button>
        ))}
      </Flex>
    </Modal>
  );
};

export default ConnectWalletModal;
