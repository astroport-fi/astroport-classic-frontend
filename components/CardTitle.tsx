import React, { FC, ReactNode } from "react";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";

import InfoIcon from "components/icons/InfoIcon";

type Props = {
  label: string;
  value: string;
  icon?: ReactNode;
  asset?: string;
  tooltip?: string;
};

const CardTitle: FC<Props> = ({ label, value, icon, asset, tooltip }) => {
  return (
    <Box>
      <HStack mb="3">
        <Text variant="light">{label}</Text>
        {tooltip && (
          <Tooltip
            label={tooltip}
            placement="top"
            hasArrow
            aria-label="Staking tooltip"
          >
            <Box cursor="pointer" color="white.600">
              <InfoIcon width="1rem" height="1rem" />
            </Box>
          </Tooltip>
        )}
      </HStack>
      <HStack align="baseline">
        {icon && <Box alignSelf="center">{icon}</Box>}
        <Text color="#fff" fontWeight="700" fontSize="3xl" lineHeight="1">
          {value}
        </Text>
        {asset && (
          <Text color="#fff" fontWeight="700" lineHeight="1">
            {asset}
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default CardTitle;
