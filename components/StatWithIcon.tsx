import React, { FC, ReactNode } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
  bgColor?: string;
};

const Stat: FC<Props> = ({
  icon,
  label,
  value,
  color = "white",
  bgColor = "rgba(255, 255, 255, 0.3)",
}) => {
  return (
    <HStack spacing="2">
      <Box color={color} bg={bgColor} borderRadius="full" p="2">
        {icon}
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="500">
          {value}
        </Text>
        <Text variant="light">{label}</Text>
      </Box>
    </HStack>
  );
};

export default Stat;
