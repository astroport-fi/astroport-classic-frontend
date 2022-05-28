import React, { FC } from "react";
import {
  Box,
  chakra,
  Center,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useAddress from "hooks/useAddress";
import { useWallet, useConnectedWallet } from "@terra-money/wallet-provider";
import { truncate, displayTNS } from "libs/text";
import useTNS from "hooks/useTNS";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import TerraIcon from "components/icons/TerraIcon";

import WalletOverlay from "components/pages/overlays/wallet";

const WalletInfoPopover: FC = () => {
  const wallet = useConnectedWallet();
  const terraAddress = useAddress() || "";
  const tnsName = useTNS(terraAddress);
  const { network } = useWallet();

  const offset: [number, number] | undefined = useBreakpointValue({
    base: [0, 0],
    sm: [-60, -40],
  });

  return (
    <PopoverWrapper
      title="My wallet"
      offset={offset || [0, 0]}
      triggerElement={() => (
        <chakra.button type="button">
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
                  {network.name === "classic" ? "Terra Classic" : "Terra 2.0"}
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
                  {tnsName && displayTNS(tnsName)}
                  {!tnsName && wallet && truncate(wallet.terraAddress, [2, 4])}
                </Text>
              </HStack>
            </Center>
          </Flex>
        </chakra.button>
      )}
    >
      <WalletOverlay />
    </PopoverWrapper>
  );
};

export default WalletInfoPopover;
