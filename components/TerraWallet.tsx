import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import {
  Text,
  HStack,
  chakra,
  Box,
  useDisclosure,
  Flex,
  Center,
} from "@chakra-ui/react";

import WalletModal from "components/modals/WalletModal";
import TerraIcon from "components/icons/TerraIcon";
import { truncate } from "libs/text";
import { useBalance } from "hooks/useBalance";
import { format } from "libs/parse";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();
  const wallet = useConnectedWallet();
  const balance = useBalance(Denom.USD);

  // console.log(disconnect());

  if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <Flex color="white" spacing="0.5" justify="center">
        <Box
          color="white"
          bg="brand.lightBlue"
          py="2"
          px="3"
          borderTopLeftRadius="full"
          borderBottomLeftRadius="full"
          mr="0.5"
        >
          <HStack spacing="3">
            <TerraIcon width="1.25rem" height="1.25rem" />
            <Text fontSize="sm" color="white">
              {wallet && truncate(wallet.terraAddress)}
            </Text>
          </HStack>
        </Box>
        <Center
          color="white"
          bg="brand.lightBlue"
          py="2"
          px="3"
          borderTopRightRadius="full"
          borderBottomRightRadius="full"
        >
          <HStack spacing="3">
            <Text fontSize="sm" color="white">
              UST
            </Text>
            <Text fontSize="sm" color="white">
              {format(balance, Denom.USD)}
            </Text>
          </HStack>
        </Center>
      </Flex>
    );
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
          <Text>Connect your wallet</Text>
        </HStack>
      </chakra.button>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
