import React, { FC } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useTokenInfo } from "modules/common";

type Props = {
  tokens: string[];
  borderRadius?: string;
};

const RawPoolBox: FC<Props> = ({ tokens, borderRadius }) => {
  const { getIcon, getSymbol, getProtocol } = useTokenInfo(tokens);

  const poolName = tokens.map((token) => getSymbol(token)).join(" - ");
  const poolLabel = tokens.map((token) => getProtocol(token)).join(" - ");

  return (
    <Flex
      flexDirection="column"
      bg="whiteAlpha.200"
      h="56px"
      py={2.5}
      px={5}
      borderRadius={borderRadius || "32px"}
      justifyContent="center"
      borderWidth="1px"
      borderColor="whiteAlpha.300"
    >
      <Flex>
        {tokens.map((token) => (
          <Image
            mr="0.5"
            key={token}
            src={getIcon(token)}
            width="4"
            height="4"
            alt={getSymbol(token)}
          />
        ))}
        <Text ml="1" fontSize="lg" lineHeight={1}>
          {poolName}
        </Text>
      </Flex>
      <Text
        mt={1.5}
        color="whiteAlpha.500"
        fontWeight="medium"
        fontSize="xs"
        lineHeight={1}
      >
        {poolLabel}
      </Text>
    </Flex>
  );
};

export default RawPoolBox;
