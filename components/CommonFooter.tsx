import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import FormFee from "components/common/FormFee";

export interface Cell {
  title: string;
  value: string;
}

export interface ConfirmButton {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface Props {
  fee: Fee;
  cells: Cell[];
  confirmButton: ConfirmButton;
}

const CommonFooter: FC<Props> = ({ fee, cells, confirmButton }) => {
  return (
    <Box mb="8">
      <Flex justify="space-between" my="8">
        {cells.map((cell) => (
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
          >
            <Text textStyle="medium">{cell.value}</Text>
            <Text textStyle="small" variant="dimmed">
              {cell.title}
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex flex="1" align="center" flexDirection="column">
        <Button
          variant="primary"
          type={confirmButton.type || "button"}
          isDisabled={confirmButton.isDisabled}
          isLoading={confirmButton.isLoading}
          onClick={confirmButton.onClick}
        >
          {confirmButton.title}
        </Button>
        <Box color="white">
          {!confirmButton.isDisabled && <FormFee fee={fee} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CommonFooter;
