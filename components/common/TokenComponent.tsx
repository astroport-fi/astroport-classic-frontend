import React, { FC } from "react";
import { HStack, Image, Text } from "@chakra-ui/react";

type TokenComponentProps = {
  token1Icon: string;
  token1Symbol: string;
  token2Icon: string;
  token2Symbol: string;
  boxSize?: number;
};

const TokenComponent: FC<TokenComponentProps> = ({
  token1Icon,
  token1Symbol,
  token2Icon,
  token2Symbol,
  boxSize = 3,
}) => {
  return (
    <HStack spacing={2}>
      <HStack spacing={1}>
        <Image src={token1Icon} alt={token1Symbol} boxSize={boxSize} />
        <Image src={token2Icon} alt={token2Symbol} boxSize={boxSize} />
      </HStack>
      <HStack>
        <Text textStyle="medium">
          {token1Symbol} - {token2Symbol}
        </Text>
      </HStack>
    </HStack>
  );
};

export default TokenComponent;
