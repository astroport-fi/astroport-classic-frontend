import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { PoolFormType } from "types/common";

type Props = {
  label: string;
  value: PoolFormType;
  type: PoolFormType;
  onClick: () => void;
};

const HeaderItem: FC<Props> = ({ label, value, type, onClick }) => {
  const isActive = value === type;

  return (
    <Text
      as="button"
      fontSize="xl"
      onClick={onClick}
      color={isActive ? "white" : "white.500"}
    >
      {label}
    </Text>
  );
};

export default HeaderItem;
