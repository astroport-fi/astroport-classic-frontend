import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { Select, Single, SingleLP, SelectLP } from "components/TokenInput";

type Props = {
  hideToken?: string;
  tokens?: string[];
  isLpToken?: boolean;
  isSingle?: boolean;
  onBlur: any;
  onChange: any;
  value: string;
};

const Field: FC<Props> = ({
  hideToken,
  value,
  onChange,
  // onBlur,
  isSingle,
  isLpToken,
  tokens,
}) => {
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

    return (
      <Select
        value={value}
        tokens={tokens}
        hideToken={hideToken}
        onClick={handleClick}
      />
    );
  };

  return <Box>{isSingle ? renderSingle() : renderSelect()}</Box>;
};

export default Field;
