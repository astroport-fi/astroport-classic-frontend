import React, { FC } from "react";
import { Box, Flex, Text, IconButton, HStack } from "@chakra-ui/react";

import GraphIcon from "components/icons/GraphIcon";
import PoolHeaderTypeItem from "components/pool/PoolHeaderTypeItem";
import { PoolFormType } from "types/common";

type Props = {
  pool: any;
  type: PoolFormType;
  isChartOpen: boolean;
  onChartClick: (v: boolean) => void;
  onTypeClick: (m: PoolFormType) => void;
};

const UnstakeActions: FC<Props> = ({
  type,
  isChartOpen,
  onChartClick,
  onTypeClick,
}) => {
  return (
    <Flex justify="space-between" color="white" mb="4" px="6">
      <Box flex="1">
        <HStack>
          <PoolHeaderTypeItem
            label="Provide"
            value={type}
            type={PoolFormType.Provide}
            onClick={() => onTypeClick(PoolFormType.Provide)}
          />
          <Text fontSize="xl">|</Text>
          <PoolHeaderTypeItem
            label="Withdraw"
            value={type}
            type={PoolFormType.Withdraw}
            onClick={() => onTypeClick(PoolFormType.Withdraw)}
          />
        </HStack>
      </Box>
      <Box>
        <IconButton
          aria-label="Graph"
          icon={<GraphIcon />}
          variant="icon"
          size="xs"
          isRound
          isActive={isChartOpen}
          onClick={() => onChartClick(!isChartOpen)}
        />
      </Box>
    </Flex>
  );
};

export default UnstakeActions;
