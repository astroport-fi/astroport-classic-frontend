import React, { FC } from "react";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import { Text, HStack, Flex, chakra, Image, Box } from "@chakra-ui/react";
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

const ButtonStyle = {
  transition: "0.2s all",
  p: "6",
  borderRadius: "xl",
  bg: "brand.purple",
  color: "white",
  width: "100%",
  mb: "4",
};

const getIconImg = (identifier: string | undefined, icon: string) => {
  if (identifier === "station") {
    return <TerraExtensionIcon />;
  } else if (identifier == "xdefi-wallet") {
    return <XDefiIcon />;
  }

  return (
    <Image
      bg="white"
      borderRadius="full"
      p="1"
      src={icon}
      htmlWidth="24"
      alt=""
    />
  );
};

const ConnectWalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect, availableInstallations, availableConnections } = useWallet();

  const wallets: WalletOptions[] = [
    ...availableConnections
      .filter(({ type }) => type !== ConnectType.READONLY)
      .map(({ type, icon, name, identifier }) => ({
        type,
        identifier: identifier || "",
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
        isInstalled: false,
        walletAction: () => {
          window.open(url, "_blank");
        },
      })),
  ];

  // on mobile, will need to add wallet-connect
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect to a wallet">
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
      >
        {wallets.map((wallet, index) => {
          return wallet.identifier === "xdefi-wallet" &&
            wallet.isInstalled === false &&
            //@ts-ignore
            typeof window.xfi !== "undefined" ? (
            <Box key={index} {...ButtonStyle}>
              <HStack justify="space-between">
                <Box textAlign="left">
                  <Text>XDEFI Wallet</Text>
                  <Text
                    fontSize="xs"
                    fontWeight="500"
                    color="whiteAlpha.600"
                  >{`Turn on "Prioritise XDEFI" in settings to enable`}</Text>
                </Box>
                {getIconImg(wallet.identifier, wallet.icon)}
              </HStack>
            </Box>
          ) : (
            <chakra.button
              key={index}
              {...ButtonStyle}
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
