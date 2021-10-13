import React, { FC } from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  Image,
} from "@chakra-ui/react";

import { useAstroswap, useTokenInfo, getTokenDenoms } from "modules/common";

import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { ListLP } from "components/AmountInput";

type Props = {
  value: string;
  onClick: (token: string) => void;
};

const SelectLP: FC<Props> = ({ value, onClick }) => {
  const { pairs } = useAstroswap();
  const { getIcon, getSymbol } = useTokenInfo();
  //@ts-expect-error
  const pair = pairs.find((v) => v.liquidity_token == value);
  //@ts-expect-error
  const [token1, token2] = getTokenDenoms(pair.asset_infos);
  const icon1 = getIcon(token1);
  const symbol1 = getSymbol(token1);
  const icon2 = getIcon(token2);
  const symbol2 = getSymbol(token2);

  const renderButton = () => {
    if (pair) {
      return (
        <Flex align="center" justify="space-between">
          <HStack spacing="-2">
            <Image src={icon1} width="1.5rem" height="1.5rem" alt="Logo" />
            <Image src={icon2} width="1.5rem" height="1.5rem" alt="Logo" />
          </HStack>

          <Box ml="3" fontWeight="500" flex="1">
            <Text fontSize="2xl" color="white">
              {symbol1} - {symbol2}
            </Text>
            <Text fontSize="xs" color="white.400">
              Mars - Terra
            </Text>
          </Box>

          <Box>
            <ChevronDownIcon />
          </Box>
        </Flex>
      );
    }

    return null;
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Box flex="1">
          <Menu isLazy>
            <Box pr="8">
              <MenuButton
                as={Button}
                bg="white.100"
                color="white"
                borderRadius="full"
                borderWidth="1px"
                borderColor="white.200"
                textAlign="left"
                h="16"
                w="full"
                _active={{
                  bg: "white.200",
                }}
                _focus={{
                  outline: "none",
                }}
                _hover={{
                  bg: "white.200",
                }}
              >
                {renderButton()}
              </MenuButton>
            </Box>
            <MenuList>
              <Box p="4" minW="26rem">
                <ListLP onClick={onClick} />
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default SelectLP;
