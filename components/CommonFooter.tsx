import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

export interface Cell {
  title: string
  value: string
}

export interface ConfirmButton {
  title: string
  isDisabled?: boolean
  onClick?: () => void
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

interface Props {
  cells: Cell[]
  confirmButton: ConfirmButton
}

export const CommonFooter: FC<Props> = (props) => {
  const {
    cells,
    confirmButton,
  } = props;

  return (
    <Box>
      <Flex justify="space-between" px="12" my="8">
        {cells.map((cell) => (
          <Box
            key={cell.value}
            flex="1"
            borderRightColor="whiteAlpha.600"
            borderRightWidth="1px"
            pl="4"
            _first={{
              borderLeftColor: "whiteAlpha.600",
              borderLeftWidth: "1px",
            }}
          >
            <Text color="white" fontSize="sm">
              {cell.value}
            </Text>
            <Text variant="light">
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
          onClick={confirmButton.onClick}
        >
          {confirmButton.title}
        </Button>
      </Flex>
    </Box>
  );
};
