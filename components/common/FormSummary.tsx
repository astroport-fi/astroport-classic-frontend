import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import TokenCard from "components/common/TokenCard";

type Props = {
  token1: {
    asset: string;
    amount: string;
  };
  token2?: {
    asset: string;
    amount: string;
  };
  label1: string;
  label2?: string;
};

const FormSummary: FC<Props> = ({ label1, label2, token1, token2 }) => {
  return (
    <Box>
      <Text mb="1" px="2" variant="light">
        {label1}
      </Text>
      <TokenCard token={token1} />
      {token2 && label2 && (
        <>
          <Text mt="6" mb="1" px="2" variant="light">
            {label2}
          </Text>
          <TokenCard token={token2} />
        </>
      )}
    </Box>
  );
};

export default FormSummary;
