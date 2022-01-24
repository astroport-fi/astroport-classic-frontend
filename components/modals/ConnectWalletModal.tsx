import React, { FC } from "react";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import { Text, HStack, Flex, chakra, Image } from "@chakra-ui/react";
import Modal from "components/modals/Modal";
import TerraExtensionIcon from "components/icons/TerraExtensionIcon";
import TerraMobileIcon from "components/icons/TerraMobileIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectWalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect, availableConnections } = useWallet();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect to a wallet">
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
      >
        {availableConnections
          .filter(({ type }) => type === ConnectType.EXTENSION)
          .map(({ identifier, name, icon }) => (
            <chakra.button
              key={identifier}
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
                connect(ConnectType.EXTENSION, identifier);
              }}
            >
              <HStack justify="space-between">
                <Text>{name} Extension</Text>
                {identifier === "station" ? (
                  <TerraExtensionIcon />
                ) : (
                  <Image src={icon} width="24" alt="" />
                )}
              </HStack>
            </chakra.button>
          ))}
        <chakra.button
          transition="0.2s all"
          p="6"
          borderRadius="xl"
          bg="brand.purple"
          color="white"
          width="100%"
          _hover={{
            bg: "white",
            color: "brand.dark",
          }}
          onClick={() => {
            onClose();
            connect(ConnectType.WALLETCONNECT);
          }}
        >
          <HStack justify="space-between">
            <Text>Terra Station Mobile</Text>
            <TerraMobileIcon width="1.5rem" height="1.5rem" />
          </HStack>
        </chakra.button>
      </Flex>
    </Modal>
  );
};

export default ConnectWalletModal;
