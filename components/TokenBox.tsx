import React, { FC } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  label?: string;
  borderRadius?: string;
};

const TokenBox: FC<Props> = ({ token, label, borderRadius }) => {
  const { getIcon, getSymbol } = useTokenInfo([token]);

  return (
    <Flex
      w="full"
      bg="whiteAlpha.200"
      h="56px"
      py={2}
      px={3}
      borderRadius={borderRadius || "32px"}
      alignItems="center"
      borderWidth="1px"
      borderColor="whiteAlpha.300"
      fontWeight="normal"
    >
      <Box>
        <Image
          src={getIcon(token)}
          width="8"
          height="8"
          alt={getSymbol(token)}
        />
      </Box>
      <Flex ml={3} flexDirection="column">
        <Text fontSize="lg" lineHeight={1}>
          {getSymbol(token)}
        </Text>
        {label && (
          <Text
            mt={1.5}
            color="whiteAlpha.500"
            fontWeight="medium"
            fontSize="xs"
            lineHeight={1}
          >
            {label}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default TokenBox;
