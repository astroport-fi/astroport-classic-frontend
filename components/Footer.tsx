import React, { FC } from "react";
import { Text, HStack } from "@chakra-ui/react";

import { useTerra } from "@arthuryeti/terra";

const Footer: FC = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  return (
    <HStack py="4" color="brand.lightBlue" fontSize="sm" spacing="4" pb="8">
      <Text>Ver 1.0.000</Text>
      <Text>Updated: 22 Jan 2021</Text>
      <Text>{name}</Text>
    </HStack>
  );
};

export default Footer;
