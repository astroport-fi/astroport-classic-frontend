import React, { FC } from "react";
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
import { getTokenDenoms, useTokenInfo } from "@arthuryeti/terra";

import { lookupSymbol } from "libs/parse";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import LpTokenList from "components/common/LpTokenList";
import { Pair } from "types/common";

type Props = {
  isLoading: boolean;
  onTokenClick: (pair: Pair) => void;
  pair: Pair;
  pairs: Pair[];
};

const LpTokenSelect: FC<Props> = (props) => {
  const { pair, isLoading, onTokenClick, pairs } = props;

  const { getIcon, getSymbol } = useTokenInfo();

  const [token1, token2] = pair ? getTokenDenoms(pair.asset_infos) : [];

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
                <Flex align="center" justify="space-between">
                  <Flex align="center" justify="space-between">
                    <Image
                      src={getIcon(token1)}
                      width="1rem"
                      height="1rem"
                      alt="Logo"
                    />
                    <Image
                      src={getIcon(token2)}
                      width="1rem"
                      height="1em"
                      alt="Logo"
                    />
                  </Flex>

                  <Box ml="3" fontWeight="500" flex="1">
                    <Text fontSize="2xl" color="white">
                      {lookupSymbol(getSymbol(token1))} -{" "}
                      {lookupSymbol(getSymbol(token2))}
                    </Text>
                  </Box>

                  <Box>
                    <ChevronDownIcon width="1rem" height="1rem" />
                  </Box>
                </Flex>
              </MenuButton>
            </Box>
            <MenuList>
              <Box p="4" minW="26rem">
                <LpTokenList onTokenClick={onTokenClick} pairs={pairs} />
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default LpTokenSelect;
