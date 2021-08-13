import React, { FC } from "react";
import { HStack, Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ArrowLeftIcon from "components/icons/ArrowLeftIcon";

type Props = {};

const VaultChart: FC<Props> = () => {
  const router = useRouter();

  return (
    <chakra.button
      cursor="pointer"
      onClick={() => router.back()}
      color="brand.purple"
      outline="none"
    >
      <HStack spacing="2">
        <ArrowLeftIcon />
        <Text fontSize="sm" fontWeight="500">
          Back
        </Text>
      </HStack>
    </chakra.button>
  );
};

export default VaultChart;
