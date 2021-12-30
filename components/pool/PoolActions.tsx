import React, { FC } from "react";
import { Box, Flex, StackDivider, HStack } from "@chakra-ui/react";

// import GraphIcon from "components/icons/GraphIcon";
import PoolHeaderTypeItem from "components/pool/PoolHeaderTypeItem";
import { PoolFormType } from "types/common";
import BackButton from "components/BackButton";

type Props = {
  pool: any;
  type: PoolFormType;
  isChartOpen: boolean;
  onChartClick: (v: boolean) => void;
  onTypeClick: (m: PoolFormType) => void;
};

const PoolActions: FC<Props> = ({
  type,
  // isChartOpen,
  // onChartClick,
  onTypeClick,
}) => {
  return (
    <Flex justify="space-between" color="white" mb="6" px="6">
      <Box flex="1">
        <HStack spacing={4}>
          <BackButton />
          <HStack
            h="4"
            spacing={3}
            divider={<StackDivider borderColor="white" h="4" />}
          >
            <PoolHeaderTypeItem
              label="Provide"
              value={type}
              type={PoolFormType.Provide}
              onClick={() => onTypeClick(PoolFormType.Provide)}
            />
            <PoolHeaderTypeItem
              label="Withdraw"
              value={type}
              type={PoolFormType.Withdraw}
              onClick={() => onTypeClick(PoolFormType.Withdraw)}
            />
          </HStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default PoolActions;
