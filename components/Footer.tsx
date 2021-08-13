import React, { FC } from "react";
import { Text, HStack } from "@chakra-ui/react";

import { useTerra } from "contexts/TerraContext";

const Footer: FC = () => {
  const { network } = useTerra();

  return (
    <HStack py="4" color="brand.lightBlue" fontSize="sm" spacing="4" pb="8">
      <Text>Ver 1.0.000</Text>
      <Text>Updated: 22 Jan 2021</Text>
      <Text>{network.name}</Text>
    </HStack>
  );
};

export default Footer;
