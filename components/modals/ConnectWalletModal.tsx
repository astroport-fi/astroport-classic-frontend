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
  type: string;
  identifier?: string;
  name: string;
  icon: string;
  isInstalled?: boolean;
  walletAction: () => void;
};

const getIconImg = (identifier: string, icon: string) => {
  if (identifier === "station") {
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
        type,
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
      .map(({ type, icon, name, url, identifier }) => ({
        type,
        identifier,
        name: "Install " + name,
        icon,
        isInstalled: true,
        walletAction: () => {
          window.open(url, "_blank");
        },
      })),
  ];

  // on mobile, will need to add terra-station and wallet-connect
  // as above code will return empty array
  if (!wallets.some((key) => key.type === "WALLETCONNECT")) {
    wallets.push({
      type: ConnectType.WALLETCONNECT,
      name: "Wallet Connect",
      icon: "https://assets.terra.money/icon/wallet-provider/walletconnect.svg",
      walletAction: () => {
        connect(ConnectType.WALLETCONNECT);
      },
    });
  }

  if (!wallets.some((key) => key.identifier === "station")) {
    wallets.push({
      type: ConnectType.EXTENSION,
      identifier: "station",
      name: "Terra Station Wallet",
      icon: "https://assets.terra.money/icon/station-extension/icon.png",
      walletAction: () => {
        connect(ConnectType.EXTENSION, "station");
      },
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect to a wallet">
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
      >
        {wallets.map((wallet, index) => {
          return (
            <chakra.button
              key={index}
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
              onClick={() => {
                onClose();
                wallet.walletAction();
              }}
            >
              <HStack justify="space-between">
                <Text>{wallet.name}</Text>
                {getIconImg(wallet.identifier, wallet.icon)}
              </HStack>
            </chakra.button>
          );
        })}
      </Flex>
    </Modal>
  );
};

export default ConnectWalletModal;
