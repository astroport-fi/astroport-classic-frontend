import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  label: string;
  value: any;
  type: any;
  onClick: (value: any) => void;
};

const FormActionItem: FC<Props> = ({ label, value, type, onClick }) => {
  const isActive = value === type;

  return (
    <Text
      as="button"
      fontSize="1.125rem"
      onClick={onClick}
      color={isActive ? "white" : "white.500"}
    >
      {label}
    </Text>
  );
};

export default FormActionItem;
