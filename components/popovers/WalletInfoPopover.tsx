import React, { FC } from "react";
import copy from "copy-to-clipboard";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  useToast,
  Button,
  Text,
  VStack,
  PopoverTrigger,
} from "@chakra-ui/react";
import { fromTerraAmount, useAddress, useBalance } from "@arthuryeti/terra";
import { useWallet } from "@terra-money/wallet-provider";

import { truncate } from "libs/text";
import { useTokenInfo } from "modules/common";
import useFinder from "hooks/useFinder";
import { useTokenPriceInUst } from "modules/swap";

import CopyIcon from "components/icons/CopyIcon";
import ViewIcon from "components/icons/ViewIcon";

type Props = {
  triggerElement: () => React.ReactElement;
};

const WalletInfoPopover: FC<Props> = ({ triggerElement }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const { disconnect } = useWallet();
  const toast = useToast();
  const icon = getIcon("uusd");
  const symbol = getSymbol("uusd");
  const balance = useBalance("uusd");
  const price = useTokenPriceInUst("uusd");
  const terraAddress = useAddress();
  const finder = useFinder();

  const copyAddress = () => {
    copy(terraAddress);
    toast({
      title: "Address copied.",
      description: "Your Terra address is now in your clipboard",
      status: "info",
      duration: 2000,
      isClosable: false,
    });
  };

  return (
    <Popover placement="left" offset={[160, 20]}>
      <PopoverTrigger>{triggerElement()}</PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>In my Wallet</PopoverHeader>
        <PopoverBody>
          <Flex direction="column" justify="center" width="96">
            <Flex flex={1} justify="space-between" align="center" py="2">
              <HStack flex={1}>
                <Image boxSize="8" src={icon} />
                <Box>
                  <Text textStyle="h3" lineHeight="1">
                    {symbol}
                  </Text>
                  <Text textStyle="small" variant="dimmed">
                    Terra
                  </Text>
                </Box>
              </HStack>
              <Flex direction="column" width={1 / 3} gridRowGap={1}>
                <HStack flex={1} justify="space-between">
                  <Text flex={1} textStyle="small" variant="dimmed">
                    In Wallet:{" "}
                  </Text>
                  <Text textStyle="small">$ {fromTerraAmount(balance)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text flex={1} textStyle="small" variant="dimmed">
                    Price:{" "}
                  </Text>
                  <Text textStyle="small" variant="dimmed">
                    {fromTerraAmount(price)}
                  </Text>
                </HStack>
              </Flex>
            </Flex>
            <VStack mt={6} align="flex-start">
              <Text textStyle="minibutton">My Address</Text>
              <Text textStyle="small" variant="dimmed">
                {truncate(terraAddress, [16, 16])}
              </Text>
            </VStack>
            <Flex mt={6} justify="space-between">
              <chakra.button onClick={copyAddress}>
                <HStack>
                  <CopyIcon
                    width="1.5rem"
                    height="1.5rem"
                    fill="brand.deepBlue"
                  />
                  <Text textStyle="small" variant="dimmed">
                    Copy Address
                  </Text>
                </HStack>
              </chakra.button>
              <Link isExternal href={finder(terraAddress)}>
                <HStack>
                  <ViewIcon
                    width="1.5rem"
                    height="1.5rem"
                    fill="brand.deepBlue"
                  />
                  <Text textStyle="small" variant="dimmed">
                    View on Terra Finder
                  </Text>
                </HStack>
              </Link>
            </Flex>
          </Flex>
          <Box mt="6">
            <Button
              type="button"
              variant="primary"
              isFullWidth
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default WalletInfoPopover;
