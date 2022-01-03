import React, { FC } from "react";
import { Icon } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

type Props = IconProps;

const CircularIcon: FC<Props> = (props) => {
  return (
    <Icon
      w={6}
      h={6}
      bg="brand.deepBlue"
      rounded="full"
      borderColor="white"
      borderWidth={1}
      color="white"
      {...props}
    />
  );
};

export default CircularIcon;
