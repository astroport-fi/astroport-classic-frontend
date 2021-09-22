import React, { FC, ReactNode } from "react";
import { Box, Flex, IconButton, HStack } from "@chakra-ui/react";

import GraphIcon from "components/icons/GraphIcon";

type Props = {
  children: ReactNode;
  isChartOpen?: boolean;
  onChartClick?: (v: any) => void;
};

const FormHeader: FC<Props> = ({ children, isChartOpen, onChartClick }) => {
  return (
    <Flex justify="space-between" color="white" mb="4" px="6">
      <Box flex="1">
        <HStack>{children}</HStack>
      </Box>
      {/* <Box>
        <IconButton
          aria-label="Graph"
          icon={<GraphIcon />}
          variant="icon"
          isActive={isChartOpen}
          onClick={() => onChartClick(!isChartOpen)}
        />
      </Box> */}
    </Flex>
  );
};

export default FormHeader;
