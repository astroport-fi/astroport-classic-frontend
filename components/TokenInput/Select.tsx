import React, { FC, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  useDisclosure,
  Image,
  VStack,
  useBreakpointValue,
  PlacementWithLogical,
  useMediaQuery,
  Switch,
} from "@chakra-ui/react";
import Modal from "components/modals/Modal";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { TagList, List } from "components/TokenInput";
import Search from "components/common/Search";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import {
  handleTinyAmount,
  useTokenInfo,
  toggleValueInArray,
} from "modules/common";
import { COMMON_TOKENS, MOBILE_MAX_WIDTH } from "constants/constants";
import useLocalStorage from "hooks/useLocalStorage";

type Props = {
  hidePrice?: boolean;
  value: string;
  onClick: (token: string) => void;
  tokens?: string[] | undefined;
};

const ButtonStyle = (): any => {
  return {
    bg: "white.100",
    color: "white",
    borderRadius: "full",
    borderWidth: "1px",
    borderColor: "white.200",
    textAlign: "left",
    justifyContent: "space-between",
    h: ["12", "16"],
    pr: "6",
    w: "full",
    _active: { bg: "white.200" },
    _focus: { outline: "none" },
    _hover: { bg: "white.200" },
  };
};

const SelectBody: FC<{
  inputColor: string;
  setFilter: (value: React.SetStateAction<string>) => void;
  handleClick: (token: string) => void;
  filteredTokens: string[];
  allowedTokens: string[];
  filter: string;
  favoriteListToggle: boolean;
  toggleFavoriteList: () => void;
  handleFavorite: (token: string) => void;
  favoritedTokens: string[];
}> = ({
  inputColor,
  setFilter,
  handleClick,
  filteredTokens,
  allowedTokens,
  filter,
  favoriteListToggle,
  toggleFavoriteList,
  handleFavorite,
  favoritedTokens = [],
}) => {
  const initialFocusRef = React.useRef();

  return (
    <VStack spacing={6} align="stretch" w={["calc(100vw - 80px)", null, "96"]}>
      <Search
        color={inputColor}
        iconStyle={{ color: inputColor }}
        borderColor={inputColor}
        placeholder="Search token"
        onChange={(e) => setFilter(e.target.value)}
        variant="search"
        // @ts-ignore
        ref={initialFocusRef}
      />
      <Flex>
        <Box flex={1}>
          <TagList tokens={COMMON_TOKENS} onClick={handleClick} />
        </Box>
        <Box textAlign="right">
          <Text textStyle="minibutton">Only favorites</Text>
          <Switch
            isChecked={favoriteListToggle}
            onChange={toggleFavoriteList}
            mt="2"
            height="22px"
          />
        </Box>
      </Flex>
      <List
        onClick={handleClick}
        onFavorite={handleFavorite}
        tokens={filteredTokens}
        filtered={filteredTokens.length !== allowedTokens.length}
        filteredTerm={filter}
        favoritedTokens={favoritedTokens}
      />
    </VStack>
  );
};

const Select: FC<Props> = ({ hidePrice = false, value, onClick, tokens }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const { getIcon, getSymbol, isHidden } = useTokenInfo();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const price = useTokenPriceInUstWithSimulate(value);
  const formattedPrice = handleTinyAmount(price, "0,0.00", false, " USTC");
  const [filter, setFilter] = useState("");
  const [isLazy, setIsLazy] = useState(true);
  const [favoriteListToggle, setFavoriteListToggle] = useState(false);
  const [favoritedTokens, setFavoritedTokens] = useLocalStorage<any>(
    "favoritedTokens",
    []
  );

  const allowedTokens = (tokens || [])
    .filter((token: string) => !isHidden(token))
    .filter((token: string) => {
      if (favoriteListToggle) return favoritedTokens.includes(token);
      return true;
    });
  const filteredTokens = allowedTokens.filter((token: string) => {
    return (
      getSymbol(token).toLowerCase().includes(filter.toLowerCase()) ||
      token === filter
    );
  });

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

  const toggleFavoriteList = () => {
    setFavoriteListToggle((value) => !value);
  };

  const handleFavorite = (token: string) => {
    setFavoritedTokens(toggleValueInArray(token, favoritedTokens));
  };

  const renderButton = () => {
    const icon = getIcon(value);
    // temporary hide if token is USTC
    const isUST = value == "uusd" ? true : false;

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
            {!hidePrice && !isUST && (
              <Text textStyle={["small", "medium"]} color="white.400">
                Price: {formattedPrice}
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

  return isMobile ? (
    <>
      <Button {...ButtonStyle()} onClick={handleOpen}>
        {renderButton()}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} title="Select token">
        <SelectBody
          inputColor={inputColor}
          setFilter={setFilter}
          handleClick={handleClick}
          filteredTokens={filteredTokens}
          allowedTokens={allowedTokens}
          filter={filter}
          favoriteListToggle={favoriteListToggle}
          toggleFavoriteList={toggleFavoriteList}
          handleFavorite={handleFavorite}
          favoritedTokens={favoritedTokens}
        />
      </Modal>
    </>
  ) : (
    <PopoverWrapper
      title="Select token"
      placement={placement}
      isLazy={isLazy}
      matchWidth
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      triggerElement={() => (
        <Button {...ButtonStyle()}>{renderButton()}</Button>
      )}
    >
      <SelectBody
        inputColor={inputColor}
        setFilter={setFilter}
        handleClick={handleClick}
        filteredTokens={filteredTokens}
        allowedTokens={allowedTokens}
        filter={filter}
        favoriteListToggle={favoriteListToggle}
        toggleFavoriteList={toggleFavoriteList}
        handleFavorite={handleFavorite}
        favoritedTokens={favoritedTokens}
      />
    </PopoverWrapper>
  );
};

export default Select;
