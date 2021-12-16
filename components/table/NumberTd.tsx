import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import numeral from "numeral";

type Props = {
  value: any;
};

const NumberTd: FC<Props> = ({ value }) => {
  const formatted = numeral(value).format("0,0.00");

  return <Text fontSize="sm">{formatted} ASTRO</Text>;
};

export default NumberTd;
