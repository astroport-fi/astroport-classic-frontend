import React, { FC } from "react";
import { Box, forwardRef } from "@chakra-ui/react";
import { Select, Single, SingleLP, SelectLP } from "components/TokenInput";
import { useAstroswap } from "modules/common";

type Props = {
  tokens?: string[];
  isLpToken?: boolean;
  isSingle?: boolean;
  isMobile?: boolean;
  hidePrice?: boolean;
  onChange: any;
  value: string;
  priceSource?: "swap-simulation" | "pool-ratio";
};

const Field: FC<Props> = forwardRef(
  (
    {
      value,
      onChange,
      isSingle,
      isMobile = false,
      hidePrice,
      isLpToken,
      tokens,
      priceSource,
    },
    ref
  ) => {
    const { tokens: allTokens } = useAstroswap();
    const currentTokens = tokens ?? (allTokens && Object.keys(allTokens));

    const handleClick = (asset: string) => {
      onChange(asset);
    };

    const renderSingle = () => {
      if (isLpToken) {
        return <SingleLP isMobile={isMobile} asset={value} />;
      }

      return (
        <Single
          isMobile={isMobile}
          asset={value}
          hidePrice={!!hidePrice}
          priceSource={priceSource}
        />
      );
    };

    const renderSelect = () => {
      if (isLpToken) {
        return <SelectLP value={value} onClick={handleClick} />;
      }

      return (
        <Select
          value={value}
          tokens={currentTokens}
          hidePrice={!!hidePrice}
          onClick={handleClick}
        />
      );
    };

    return <Box ref={ref}>{isSingle ? renderSingle() : renderSelect()}</Box>;
  }
);

export default Field;
