import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { Box, Flex, Button, Text, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";

import FormFee from "components/common/FormFee";

export interface Cell {
  title: string;
  value: string;
  render?: Function;
}

export interface ConfirmButton {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: string;
  borderRadius?: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface Props {
  fee?: Fee | undefined;
  cells?: Cell[] | undefined;
  confirmButton: ConfirmButton;
}

const MobileComponent: FC<Props> = ({ fee, cells, confirmButton }) => {
  return (
    <Box mb="8">
      {cells && cells.length > 0 && (
        <Flex
          bg="white.100"
          borderRadius="lg"
          flexDirection="column"
          justify="space-between"
          mt="8"
          p="4"
        >
          {cells.map((cell) => (
            <Flex key={cell.title} my="2" justify="space-between">
              <Text textStyle="medium" color="white">
                {cell.title}
              </Text>
              <Text textStyle="medium" color="white.600">
                {cell.value}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
      <Flex flex="1" align="center" flexDirection="column" mt="8">
        <Button
          variant={confirmButton.variant || "primary"}
          type={confirmButton.type || "button"}
          borderRadius={confirmButton.borderRadius || "full"}
          isDisabled={!!confirmButton.isDisabled}
          isLoading={!!confirmButton.isLoading}
          onClick={confirmButton.onClick}
        >
          {confirmButton.title}
        </Button>
        <Box color="white">
          {!confirmButton.isDisabled && fee && <FormFee fee={fee} />}
        </Box>
      </Flex>
    </Box>
  );
};

const Component: FC<Props> = ({ fee, cells, confirmButton }) => {
  return (
    <Box mb="8">
      {cells && cells.length > 0 && (
        <Flex justify="space-between" mt="8">
          {cells.map((cell) =>
            cell.render ? (
              cell.render()
            ) : (
              <Box
                color="white"
                key={cell.title}
                flex="1"
                borderRightColor="whiteAlpha.600"
                borderRightWidth="1px"
                pl="4"
                _first={{
                  borderLeftColor: "whiteAlpha.600",
                  borderLeftWidth: "1px",
                }}
                textAlign="center"
              >
                <Text textStyle="medium">{cell.value}</Text>
                <Text textStyle="small" variant="dimmed">
                  {cell.title}
                </Text>
              </Box>
            )
          )}
        </Flex>
      )}
      <Flex flex="1" align="center" flexDirection="column" mt="8">
        <Button
          variant={confirmButton.variant || "primary"}
          type={confirmButton.type || "button"}
          borderRadius={confirmButton.borderRadius || "full"}
          isDisabled={!!confirmButton.isDisabled}
          isLoading={!!confirmButton.isLoading}
          onClick={confirmButton.onClick}
        >
          {confirmButton.title}
        </Button>
        <Box color="white">
          {!confirmButton.isDisabled && fee && <FormFee fee={fee} />}
        </Box>
      </Flex>
    </Box>
  );
};

const CommonFooter: FC<Props> = ({ fee, cells, confirmButton }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return isMobile ? (
    <MobileComponent fee={fee} cells={cells} confirmButton={confirmButton} />
  ) : (
    <Component fee={fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default CommonFooter;
