import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  useDisclosure,
  Image,
  VStack,
  useBreakpointValue,
  PlacementWithLogical,
} from "@chakra-ui/react";

import PopoverWrapper from "components/popovers/PopoverWrapper";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { TagList, List } from "components/TokenInput";
import Search from "components/common/Search";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { useTokenInfo } from "modules/common";
import { COMMON_TOKENS } from "constants/constants";

type Props = {
  hideToken?: string;
  hidePrice?: boolean;
  value: string;
  onClick: (token: string) => void;
  tokens: string[];
};

const Select: FC<Props> = ({
  hideToken,
  hidePrice = false,
  value,
  onClick,
  tokens,
}) => {
  const { getIcon, getSymbol, isHidden } = useTokenInfo();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const price = useTokenPriceInUstWithSimulate(value).toFixed(2);
  const [filter, setFilter] = useState("");
  const [isLazy, setIsLazy] = useState(true);

  const matchTokenOrExactAddress = (token: string) => {
    return (
      getSymbol(token).toLowerCase().includes(filter.toLowerCase()) ||
      token === filter
    );
  };
  const allowedTokens = tokens.filter((token: string) => !isHidden(token));
  const notHiddenTokens = allowedTokens.filter(
    (token: string) => token !== hideToken
  );
  const filteredTokens = notHiddenTokens.filter(matchTokenOrExactAddress);
  const commonTokens = COMMON_TOKENS.filter(
    (token: string) => token !== hideToken
  );

  const noTokensFound = filteredTokens.length === 0;
  const inputColor = noTokensFound ? "red.500" : "brand.deepBlue";

  const handleOpen = () => {
    setFilter("");
    onOpen();
    setIsLazy(false);
  };

  // delay in isLazy=true ensures dismiss animation of popover
  // shows properly
  const handleClose = () => {
    onClose();
    setTimeout(function () {
      setIsLazy(true);
    }, 500);
  };

  const handleClick = (token: string) => {
    onClose();
    setFilter("");
    onClick(token);
  };

  const renderButton = () => {
    const icon = getIcon(value);

    if (value) {
      return (
        <>
          <Box flexShrink={0}>
            <Image
              src={icon}
              width={["6", "8"]}
              height={["6", "8"]}
              alt="Logo"
            />
          </Box>
          <Box ml="3" fontWeight="500" flex="1">
            <Text textStyle={["medium", "h3"]}>{getSymbol(value)}</Text>
            {!hidePrice && (
              <Text textStyle={["small", "medium"]} color="white.400">
                Price: ${price}
              </Text>
            )}
          </Box>
          <Box>
            <ChevronDownIcon />
          </Box>
        </>
      );
    }

    return null;
  };

  const placement = useBreakpointValue({
    base: "auto",
    md: "right",
  }) as PlacementWithLogical;

  const initialFocusRef = React.useRef();

  return (
    <PopoverWrapper
      title="Select token"
      placement={placement}
      isLazy={isLazy}
      matchWidth
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      initialFocusRef={initialFocusRef}
      triggerElement={() => (
        <Button
          bg="white.100"
          color="white"
          borderRadius="full"
          borderWidth="1px"
          borderColor="white.200"
          textAlign="left"
          justifyContent="space-between"
          h={["12", "16"]}
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
      <VStack
        spacing={6}
        align="stretch"
        w={["calc(100vw - 80px)", null, "96"]}
      >
        <Search
          color={inputColor}
          iconStyle={{ color: inputColor }}
          borderColor={inputColor}
          placeholder="Search token"
          onChange={(e) => setFilter(e.target.value)}
          variant="search"
          ref={initialFocusRef}
        />
        <TagList tokens={commonTokens} onClick={handleClick} />
        <List
          onClick={handleClick}
          tokens={filteredTokens}
          filtered={filteredTokens.length !== notHiddenTokens.length}
          filteredTerm={filter}
        />
      </VStack>
    </PopoverWrapper>
  );
};

export default Select;
