import React from "react";
import { Button, HStack, Image, MenuItem, Text } from "@chakra-ui/react";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  onClick: (token: string) => void;
};

const TagItem = ({ token, onClick }: Props) => {
  const { getIcon, getSymbol } = useTokenInfo();

  return (
    <MenuItem
      isFocusable={false}
      as={Button}
      p={1}
      variant="filter"
      width="auto"
      bg="white.500"
      borderRadius="base"
      color="brand.deepBlue"
      onClick={() => onClick(token)}
    >
      <HStack>
        <Image src={getIcon(token)} alt={getSymbol(token)} boxSize={3} />
        <Text textStyle="minibutton">{getSymbol(token)}</Text>
      </HStack>
    </MenuItem>
  );
};

export default TagItem;
