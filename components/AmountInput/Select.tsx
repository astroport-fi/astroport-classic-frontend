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
import { fromTerraAmount } from "@arthuryeti/terra";

import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { List } from "components/AmountInput";
import { useTokenPriceInUst } from "modules/swap";
import { useTokenInfo } from "modules/common";

type Props = {
  value: string;
  onClick: (token: string) => void;
  tokens?: string[];
};

const Select: FC<Props> = ({ value, onClick, tokens }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(value);

  const renderButton = () => {
    const icon = getIcon(value);

    if (value) {
      return (
        <Flex align="center" justify="space-between">
          <Box>
            <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
          </Box>

          <Box ml="3" fontWeight="500" flex="1">
            <Text fontSize="2xl" color="white">
              {getSymbol(value)}
            </Text>
            <Text fontSize="xs" color="white.400">
              {/* TODO: Fix type */}
              Price: ${fromTerraAmount(price as string)}
            </Text>
          </Box>

          <Box>
            <ChevronDownIcon width="1rem" height="1rem" />
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
                <List onClick={onClick} tokens={tokens} />
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Select;
