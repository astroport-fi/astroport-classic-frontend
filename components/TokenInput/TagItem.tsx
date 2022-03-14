import React from "react";
import { Button, HStack, Image, Box, Text } from "@chakra-ui/react";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  onClick: (token: string) => void;
};

const TagItem = ({ token, onClick }: Props) => {
  const { getIcon, getSymbol } = useTokenInfo();

  return (
    <Box
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
    </Box>
  );
};

export default TagItem;
