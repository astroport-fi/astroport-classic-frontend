import React, { FC } from "react";
import { Box, forwardRef } from "@chakra-ui/react";

import { Select, Single, SingleLP, SelectLP } from "components/TokenInput";
import { useAstroswap } from "modules/common";

type Props = {
  tokens?: string[];
  isLpToken?: boolean;
  isSingle?: boolean;
  hidePrice?: boolean;
  onChange: any;
  value: string;
};

const Field: FC<Props> = forwardRef(
  ({ value, onChange, isSingle, hidePrice, isLpToken, tokens }, ref) => {
    const { tokens: allTokens } = useAstroswap();
    const currentTokens = tokens ?? Object.keys(allTokens);

    const handleClick = (asset: string) => {
      onChange(asset);
    };

    const renderSingle = () => {
      if (isLpToken) {
        return <SingleLP asset={value} />;
      }

      return <Single asset={value} hidePrice={hidePrice} />;
    };

    const renderSelect = () => {
      if (isLpToken) {
        return <SelectLP value={value} onClick={handleClick} />;
      }

      return (
        <Select
          value={value}
          tokens={currentTokens}
          hidePrice={hidePrice}
          onClick={handleClick}
        />
      );
    };

    return <Box>{isSingle ? renderSingle() : renderSelect()}</Box>;
  }
);

export default Field;
