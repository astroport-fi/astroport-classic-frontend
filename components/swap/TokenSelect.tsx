import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import {
  Box,
  Text,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  Image,
} from "@chakra-ui/react";

import { lookupSymbol, format } from "libs/parse";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import TokenList from "components/swap/TokenList";
import { useTokenPrice } from "modules/swap";
import { useTokenInfo } from "@arthuryeti/terra";

type Props = {
  isLoading: boolean;
  onTokenClick: any;
  token: string;
  tokens: string[];
};

const TokenSelect: FC<Props> = ({ token, isLoading, onTokenClick, tokens }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPrice(token);

  const renderButton = () => {
    const icon = getIcon(token);

    if (token) {
      return (
        <Flex align="center" justify="space-between">
          <Box>
            <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
          </Box>

          <Box ml="3" fontWeight="500" flex="1">
            <Text fontSize="2xl" color="white">
              {getSymbol(token)}
            </Text>
            <Text fontSize="xs" color="white.400">
              Price: ${format(price, Denom.USD)}
            </Text>
          </Box>

          <Box>
            <ChevronDownIcon width="1rem" height="1rem" />
          </Box>
        </Flex>
      );
    }
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Box flex="1">
          <Menu isLazy>
            <Box pr="8">
              <MenuButton
                as={Button}
                isLoading={isLoading}
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
                <TokenList onTokenClick={onTokenClick} tokenList={tokens} />
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenSelect;
