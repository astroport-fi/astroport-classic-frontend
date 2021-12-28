import React, { FC } from "react";
import { Text, Box } from "@chakra-ui/react";

import LpTokenCard from "components/common/LpTokenCard";
import TokenCard from "components/common/TokenCard";

type Props = {
  label: string;
  tokens: {
    asset: string;
    amount: string | number;
    isLp?: boolean;
    label?: string;
  }[];
};

const FormSummary: FC<Props> = ({ label, tokens }) => {
  return (
    <Box>
      <Text mb="1" px="2" textStyle="small" variant="secondary">
        {label}
      </Text>
      {tokens.map((token) => {
        if (token.isLp) {
          return (
            <Box key={token.asset} mb="3" _last={{ mb: "0" }}>
              <LpTokenCard token={token} />
            </Box>
          );
        }

        return (
          <>
            {token.label && (
              <Text mb="1" px="2" textStyle="small" variant="secondary">
                {token.label}
              </Text>
            )}
            <Box key={token.asset} mb="3" _last={{ mb: "0" }}>
              <TokenCard token={token} />
            </Box>
          </>
        );
      })}
      {/* {token2 && (
        <Stack spacing={3}>
          {label2 && (
            <Text mt={4} textStyle="small" variant="secondary">
              {label2}
            </Text>
          )}
          <TokenCard token={token2} />
        </Stack>
      )} */}
    </Box>
  );
};

export default FormSummary;
