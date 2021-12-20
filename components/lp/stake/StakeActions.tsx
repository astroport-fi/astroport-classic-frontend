import React, { FC } from "react";
import { Box, Flex, Text, IconButton, HStack } from "@chakra-ui/react";

import { PoolFormType } from "types/common";

import GraphIcon from "components/icons/GraphIcon";
import PoolHeaderTypeItem from "components/pool/PoolHeaderTypeItem";
import BackButton from "components/BackButton";

type Props = {
  type: PoolFormType;
  isChartOpen: boolean;
  onChartClick: (v: boolean) => void;
  onTypeClick: (m: PoolFormType) => void;
};

const StakeActions: FC<Props> = ({
  type,
  isChartOpen,
  onChartClick,
  onTypeClick,
}) => {
  return (
    <Flex justify="space-between" color="white" mb="4" px="6">
      <Box flex="1">
        <HStack>
          <BackButton />
          <PoolHeaderTypeItem
            label="Stake"
            value={type}
            type={PoolFormType.Stake}
            onClick={() => onTypeClick(PoolFormType.Stake)}
          />
          <Text fontSize="xl">|</Text>
          <PoolHeaderTypeItem
            label="Unstake"
            value={type}
            type={PoolFormType.Unstake}
            onClick={() => onTypeClick(PoolFormType.Unstake)}
          />
        </HStack>
      </Box>
      {/* <Box>
        <IconButton
          aria-label="Graph"
          icon={<GraphIcon />}
          variant="icon"
          size="xs"
          isRound
          isActive={isChartOpen}
          onClick={() => onChartClick(!isChartOpen)}
        />
      </Box> */}
    </Flex>
  );
};

export default StakeActions;
