import React, { FC, useState } from "react";
import {
  Box,
  Text,
  Button,
  useDisclosure,
  Image,
  VStack,
} from "@chakra-ui/react";

import PopoverWrapper from "components/popovers/PopoverWrapper";
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
            <Image src={icon} width="8" height="8" alt="Logo" flexShrink={0} />
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
    <PopoverWrapper
      title="Select token"
      isLazy
      placement="right"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      triggerElement={() => (
        <Button
          bg="white.100"
          color="white"
          borderRadius="full"
          borderWidth="1px"
          borderColor="white.200"
          textAlign="left"
          justifyContent="space-between"
          h="16"
          pr="6"
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
      )}
    >
      <VStack spacing={6} align="stretch" mt="1">
        <Search
          placeholder="Search token"
          onChange={(e) => setFilter(e.target.value)}
          variant="search"
        />
        <CommonTokensList onClick={handleClick} />
        <List onClick={handleClick} tokens={tokens} filter={filter} />
      </VStack>
    </PopoverWrapper>
  );
};

export default Select;
