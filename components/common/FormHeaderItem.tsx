import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  label: string;
  value: any;
  type: any;
  onClick: () => void;
};

const HeaderItem: FC<Props> = ({ label, value, type, onClick }) => {
  const isActive = value === type;

  return (
    <Text
      as="button"
      type="button"
      onClick={onClick}
      variant={isActive ? undefined : "dimmed"}
    >
      {label}
    </Text>
  );
};

export default HeaderItem;
