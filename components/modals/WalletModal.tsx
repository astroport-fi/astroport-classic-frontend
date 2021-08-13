import React, { FC } from "react";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import {
  Modal,
  ModalOverlay,
  Text,
  HStack,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  chakra,
} from "@chakra-ui/react";

import TerraExtensionIcon from "components/icons/TerraExtensionIcon";
import TerraMobileIcon from "components/icons/TerraMobileIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect } = useWallet();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Heading size="md" mb="6">
              Connect to a wallet
            </Heading>
            <chakra.button
              transition="0.2s all"
              p="6"
              borderRadius="xl"
              bg="brand.dark"
              width="100%"
              mb="4"
              _hover={{
                bg: "white",
                color: "brand.dark",
              }}
              onClick={() => {
                onClose();
                connect(ConnectType.CHROME_EXTENSION);
              }}
            >
              <HStack justify="space-between">
                <Text>Terra Station Extension</Text>
                <TerraExtensionIcon />
              </HStack>
            </chakra.button>
            <chakra.button
              transition="0.2s all"
              p="6"
              borderRadius="xl"
              bg="brand.dark"
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
