import React, { FC } from "react";
import { Text, Stack, VStack } from "@chakra-ui/react";

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
    <VStack align="stretch">
      <Stack spacing={3}>
        <Text textStyle="small" variant="secondary">
          {label1}
        </Text>
        <TokenCard token={token1} />
      </Stack>
      {token2 && (
        <Stack spacing={3}>
          {label2 && (
            <Text mt={4} textStyle="small" variant="secondary">
              {label2}
            </Text>
          )}
          <TokenCard token={token2} />
        </Stack>
      )}
    </VStack>
  );
};

export default FormSummary;
