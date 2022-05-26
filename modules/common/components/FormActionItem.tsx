import React, { FC } from "react";
import { Text, Button, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";

type Props = {
  label: string;
  value: any;
  type: any;
  onClick: (value: any) => void;
};

const FormActionItem: FC<Props> = ({ label, value, type, onClick }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const isActive = value === type;

  return isMobile ? (
    <Button
      w="100%"
      variant="filtermobile"
      isActive={isActive}
      onClick={onClick}
    >
      {label}
    </Button>
  ) : (
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
