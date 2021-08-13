import React, { FC } from "react";
import { HStack, Text, chakra } from "@chakra-ui/react";

import ExternalLinkIcon from "components/icons/ExternalLinkIcon";

type Props = {
  label: string;
  href: string;
  color?: string;
};

const VaultChart: FC<Props> = ({ href, label, color = "brand.purple" }) => {
  return (
    <chakra.a href={href} target="_blank" display="inline-block">
      <HStack color={color}>
        <Text>{label}</Text>
        <ExternalLinkIcon />
      </HStack>
    </chakra.a>
  );
};

export default VaultChart;
