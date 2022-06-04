import React, { FC } from "react";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Link,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import { fromTerraAmount } from "libs/terra";
import { useWallet } from "@terra-money/wallet-provider";
import { truncate } from "libs/text";
import { useBalance, useTokenInfo } from "modules/common";
import useFinder from "hooks/useFinder";
import useTNS from "hooks/useTNS";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import CopyIcon from "components/icons/CopyIcon";
import ViewIcon from "components/icons/ViewIcon";
import num from "libs/num";
import useAddress from "hooks/useAddress";

type Props = {
  onClose?: () => void;
  type?: "modal" | "popover";
};

const Wallet: FC<Props> = ({ onClose, type = "popover" }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const { disconnect } = useWallet();
  const toast = useToast();
  const terraAddress = useAddress() || "";
  const icon = getIcon("uusd");
  const symbol = getSymbol("uusd");
  const balance = useBalance("uusd");
  const isLow = num(balance).lt(0.01);
  const formattedBalance = isLow ? "< 0.01" : fromTerraAmount(balance);
  const price = useTokenPriceInUstWithSimulate("uusd");
  const finder = useFinder();
  const tnsName = useTNS(terraAddress);

  const copyAddress = () => {
    copy(terraAddress);
    toast({
      title: "Address copied",
      description: "Your Terra address is now in your clipboard",
      status: "info",
      duration: 2000,
      isClosable: false,
    });
  };

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        w={type === "popover" ? ["100%", "96"] : "inherit"}
      >
        <Flex flex={1} justify="space-between" align="center" py="2">
          <HStack flex={1}>
            <Image boxSize="8" src={icon} alt="" />
            <Box>
              <Text textStyle="h3" lineHeight="1">
                {symbol}
              </Text>
              <Text textStyle="small" variant="dimmed">
                Terra Classic
              </Text>
            </Box>
          </HStack>
          <Flex direction="column" width={["50%", 1 / 3]} gridRowGap={1}>
            <HStack flex={1} justify="space-between">
              <Text flex={1} textStyle="small" variant="dimmed">
                In Wallet:{" "}
              </Text>
              <Text textStyle="small">{formattedBalance}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text flex={1} textStyle="small" variant="dimmed">
                Price:{" "}
              </Text>
              <Text textStyle="small" variant="dimmed">
                $ {num(price).toFixed(2)}
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <VStack mt={6} align="flex-start">
          <Text textStyle="minibutton">My Address</Text>
          <Text textStyle="small" variant="dimmed">
            {truncate(terraAddress, [16, 16])}
            {tnsName && <>&nbsp;({tnsName})</>}
          </Text>
        </VStack>
        <Flex mt={6} justify="space-between">
          <chakra.button onClick={copyAddress}>
            <HStack>
              <CopyIcon width="1.5rem" height="1.5rem" fill="brand.deepBlue" />
              <Text textStyle="small" variant="dimmed">
                Copy Address
              </Text>
            </HStack>
          </chakra.button>
          <Link isExternal href={finder(terraAddress)}>
            <HStack>
              <ViewIcon width="1.5rem" height="1.5rem" fill="brand.deepBlue" />
              <Text textStyle="small" variant="dimmed">
                View Transaction
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
          onClick={() => {
            disconnect();
            onClose && onClose();
          }}
        >
          Disconnect
        </Button>
      </Box>
    </>
  );
};

export default Wallet;
