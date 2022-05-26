import React, { FC } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTokenInfo } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import Card from "components/Card";
import InfoIcon from "components/icons/InfoIcon";
import { DOUBLESIDED_TOOLTIP, MOBILE_MAX_WIDTH } from "constants/constants";

type Props = {
  pool: any;
  type: PoolFormType;
  mode: ProvideFormMode;
  onModeClick: (m: ProvideFormMode) => void;
};

const ToggleComponent: FC<Props> = ({ type, mode, onModeClick }) => {
  return (
    <>
      {type === PoolFormType.Provide && (
        <HStack>
          <Button
            variant="mini"
            isActive={mode === ProvideFormMode.Double}
            onClick={() => onModeClick(ProvideFormMode.Double)}
          >
            Doublesided
          </Button>
          <Tooltip
            label={DOUBLESIDED_TOOLTIP}
            placement="top"
            aria-label="More info"
          >
            <Box ml="1" cursor="pointer" textColor="whiteAlpha.500">
              <InfoIcon width="1rem" height="1rem" />
            </Box>
          </Tooltip>
          {/* <Button
            variant="mini"
            isActive={mode === ProvideFormMode.Single}
            onClick={() => onModeClick(ProvideFormMode.Single)}
          >
            Onesided
          </Button> */}
        </HStack>
      )}
    </>
  );
};

const PoolHeader: FC<Props> = ({ pool, mode, type, onModeClick }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const { getSymbol } = useTokenInfo();

  return isMobile ? (
    <Box mt="8" color="white">
      <Text ml="2" mb="4">
        Provide Liquidity
      </Text>
      <Card mb="4" py="4">
        <Flex justify="space-between" align="center">
          <Text fontSize="sm">Provide</Text>
          <ToggleComponent
            pool={pool}
            type={type}
            mode={mode}
            onModeClick={onModeClick}
          />
        </Flex>
      </Card>
    </Box>
  ) : (
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
          <ToggleComponent
            pool={pool}
            type={type}
            mode={mode}
            onModeClick={onModeClick}
          />
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
