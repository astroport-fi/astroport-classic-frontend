import React, { FC } from "react";
import { Box, Flex, forwardRef } from "@chakra-ui/react";

import { Select, Single, SingleLP, SelectLP } from "components/TokenInput";

type Props = {
  tokens?: string[];
  isLpToken?: boolean;
  isSingle?: boolean;
  onBlur: any;
  onChange: any;
  value: string;
};

const Field: FC<Props> = forwardRef(
  ({ value, onChange, onBlur, isSingle, isLpToken, tokens }, ref) => {
    const handleClick = (asset: string) => {
      onChange(asset);
    };

    const renderSingle = () => {
      if (isLpToken) {
        return <SingleLP asset={value} />;
      }

      return <Single asset={value} />;
    };

    const renderSelect = () => {
      if (isLpToken) {
        return <SelectLP value={value} onClick={handleClick} />;
      }

      return <Select value={value} tokens={tokens} onClick={handleClick} />;
    };

    return <Box ref={ref}>{isSingle ? renderSingle() : renderSelect()}</Box>;
  }
);

export default Field;
