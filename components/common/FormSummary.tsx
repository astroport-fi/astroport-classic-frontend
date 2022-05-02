import React, { FC, Fragment } from "react";
import { Text, Box } from "@chakra-ui/react";

import LpTokenCard from "components/common/LpTokenCard";
import TokenCard from "components/common/TokenCard";

type Props = {
  label: string;
  tokens: {
    asset?: string | undefined;
    amount?: string | number | undefined;
    isLp?: boolean | undefined;
    label?: string | undefined;
  }[];
};

const FormSummary: FC<Props> = ({ label, tokens }) => {
  return (
    <Box>
      <Text mb="2" px="2" textStyle="small" variant="secondary">
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
          <Fragment key={token.asset}>
            {token.label && (
              <Text mb="2" px="2" textStyle="small" variant="secondary">
                {token.label}
              </Text>
            )}
            <Box mb="3" _last={{ mb: "0" }}>
              <TokenCard token={token} />
            </Box>
          </Fragment>
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
