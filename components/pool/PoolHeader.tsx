import React, { FC } from "react";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";

import Card from "components/Card";

type Props = {
  pool: any;
  type: PoolFormType;
  mode: ProvideFormMode;
  onModeClick: (m: ProvideFormMode) => void;
};

const PoolHeader: FC<Props> = ({ pool, mode, type, onModeClick }) => {
  const { getSymbol } = useTokenInfo();

  return (
    <Box>
      <Card mb="2">
        <Flex justify="space-between" align="center">
          <HStack textStyle="small" color="white">
            <Text as="span" variant="dimmed">
              Selected Pool:
            </Text>{" "}
            <Text as="span">
              {getSymbol(pool.token1.asset)}-{getSymbol(pool.token2.asset)}
            </Text>
          </HStack>
          {type === PoolFormType.Provide && (
            <HStack>
              <Button
                variant="mini"
                isActive={mode === ProvideFormMode.Double}
                onClick={() => onModeClick(ProvideFormMode.Double)}
              >
                Doublesided
              </Button>
              {/* <Button
                variant="mini"
                isActive={mode === ProvideFormMode.Single}
                onClick={() => onModeClick(ProvideFormMode.Single)}
              >
                Onesided
              </Button> */}
            </HStack>
          )}
          {/* {type === PoolFormType.Withdraw && (
            <HStack>
              <Button
                variant="mini"
                isActive={mode === ProvideFormMode.Double}
                onClick={() => onModeClick(ProvideFormMode.Double)}
              >
                Withdraw all
              </Button>
            </HStack>
          )} */}
        </Flex>
      </Card>
    </Box>
  );
};

export default PoolHeader;
