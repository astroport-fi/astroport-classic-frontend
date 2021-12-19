import React, { FC, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Image,
  VStack,
} from "@chakra-ui/react";

import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { CommonTokensList, List } from "components/TokenInput";
import Search from "components/common/Search";
import { useTokenPriceInUst } from "modules/swap";
import { useTokenInfo } from "modules/common";

type Props = {
  value: string;
  onClick: (token: string) => void;
  tokens?: string[];
};

const Select: FC<Props> = ({ value, onClick, tokens }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const price = useTokenPriceInUst(value);
  const [filter, setFilter] = useState("");

  const handleClick = (token: string) => {
    onClose();
    onClick(token);
  };

  const renderButton = () => {
    const icon = getIcon(value);

    if (value) {
      return (
        <>
          <Box>
            <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
          </Box>

          <Box ml="3" fontWeight="500" flex="1">
            <Text textStyle="h3">{getSymbol(value)}</Text>
            {/* TODO: Fix type */}
            <Text fontSize="xs" color="white.400">
              Price: ${price}
            </Text>
          </Box>
          <Box>
            <ChevronDownIcon />
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <Popover
      isLazy
      placement="top-start"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Flex pr="8">
        <PopoverTrigger>
          <Button
            bg="white.100"
            color="white"
            borderRadius="full"
            borderWidth="1px"
            borderColor="white.200"
            textAlign="left"
            justifyContent="space-between"
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
          </Button>
        </PopoverTrigger>
      </Flex>
      <PopoverContent>
        <VStack spacing={6} align="stretch" p="4" minW="26rem">
          <Text>Select Token</Text>
          <Search
            placeholder="Search token"
            borderColor="brand.deepBlue"
            color="brand.deepBlue"
            bg="white.200"
            onChange={(e) => setFilter(e.target.value)}
          />
          <CommonTokensList onClick={handleClick} />
          <List onClick={handleClick} tokens={tokens} filter={filter} />
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default Select;
