import React, { FC, useState } from "react";
import {
  chakra,
  Text,
  Box,
  Button,
  VStack,
  useBreakpointValue,
  PlacementWithLogical,
} from "@chakra-ui/react";
import ArrowDownB from "components/icons/ArrowDownB";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import Search from "components/common/Search";
import { Token, useAstroswap } from "modules/common";
import TokenBox from "./TokenBox";
import TokenItem from "./TokenItem";

type Props = {
  value: any;
  onChange: Function;
};

const SelectToken: FC<Props> = ({ value, onChange }) => {
  const { tokens } = useAstroswap();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isLazy, setIsLazy] = useState<boolean>(true);
  const placement = useBreakpointValue({
    base: "auto",
    md: "auto",
  }) as PlacementWithLogical;
  const offset = useBreakpointValue<[number, number]>({
    base: [-50, 0],
    md: [0, 65],
  }) || [-30, 0];

  if (!tokens) {
    return null;
  }

  const handleClick = (token: any) => {
    onChange(token);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setFilter("");
    setIsOpen(true);
    setIsLazy(false);
  };

  // delay in isLazy=true ensures dismiss animation of popover
  // shows properly
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(function () {
      setIsLazy(true);
    }, 500);
  };

  const inputColor = false ? "red.500" : "brand.deepBlue";
  const tokensFiltered = Object.values(tokens).filter((token: Token) => {
    return (
      (token.symbol || "").toLowerCase().includes(filter.toLowerCase()) ||
      (token.protocol || "").toLowerCase().includes(filter.toLowerCase()) ||
      token.token === filter
    );
  });
  const filtered = Object.values(tokens).length != tokensFiltered.length;
  const tokenWord = tokensFiltered.length === 1 ? "token" : "tokens";

  return (
    <PopoverWrapper
      title="Select Token"
      isLazy={isLazy}
      // matchWidth
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      placement={placement}
      offset={offset}
      flip={false}
      triggerElement={() => (
        <Button
          variant="unstyled"
          position="relative"
          w="100%"
          h="56px"
          type="button"
          borderRadius="32px"
        >
          <TokenBox token={value} />
          <Box w={3} h={3} position="absolute" top="22px" right="5">
            <ArrowDownB width="100%" height="100%" />
          </Box>
        </Button>
      )}
    >
      <VStack
        spacing={6}
        align="stretch"
        w={["calc(100vw - 80px)", null, "470px"]}
      >
        <Search
          color={inputColor}
          iconStyle={{ color: inputColor }}
          borderColor={inputColor}
          placeholder="Search Token"
          onChange={(e) => setFilter(e.target.value)}
          variant="search"
        />
        {tokensFiltered.length === 0 && (
          <Text textStyle="minibutton" color="red.500">
            Tokens not found
          </Text>
        )}
        {tokensFiltered.length > 0 && (
          <Text textStyle="minibutton">
            {filtered ? `${tokensFiltered.length}` : "all"} {tokenWord} found
          </Text>
        )}
        <Box h="xs" overflowY="auto" px="0.5" mt="2">
          <VStack alignItems="start">
            {tokensFiltered.map((token: Token) => {
              return (
                <chakra.button
                  w="full"
                  type="button"
                  key={token.token}
                  onClick={() => handleClick(token.token)}
                >
                  <TokenItem token={token.token} />
                </chakra.button>
              );
            })}
          </VStack>
        </Box>
      </VStack>
    </PopoverWrapper>
  );
};

export default SelectToken;
