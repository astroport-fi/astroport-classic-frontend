import React, { FC } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Text,
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";
import { DEFAULT_SLIPPAGE } from "constants/constants";
import CloseIcon from "components/icons/CloseIcon";

type Props = {
  triggerElement: React.ReactElement;
  value: number;
  onChange: (value: number) => void;
  expertMode: boolean;
  onExpertModeChange: (expertMode: boolean) => void;
};

const tolerances = [DEFAULT_SLIPPAGE, 0.5, 1, 2];

const SlippagePopover: FC<Props> = ({
  triggerElement,
  value,
  onChange,
  expertMode,
  onExpertModeChange,
}) => {
  return (
    <Popover placement="left">
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent color="brand.deepBlue">
        <Flex align="center" justify="space-between" mb="4">
          <PopoverHeader>Settings</PopoverHeader>
          <PopoverCloseButton position="static">
            <CloseIcon w="6" h="6" color="#000D37" BackgroundOpacity="0" />
          </PopoverCloseButton>
        </Flex>
        <PopoverBody>
          <Box width="sm">
            <Text textStyle="minibutton">Expert mode</Text>
            <HStack mt={2}>
              <Button
                variant="filter"
                bg="brand.lightPurple"
                isActive={expertMode}
                onClick={() => onExpertModeChange(true)}
              >
                On
              </Button>
              <Button
                variant="filter"
                bg="brand.lightPurple"
                isActive={!expertMode}
                onClick={() => onExpertModeChange(false)}
              >
                Off
              </Button>
            </HStack>

            <Text mt={3} textStyle="minibutton">
              Set slippage tolerance
            </Text>
            <HStack mt={2} align="stretch">
              {tolerances.map((tolerance, index) => (
                <Button
                  key={index}
                  variant="filter"
                  bg="brand.lightPurple"
                  isActive={value === tolerance}
                  onClick={() => {
                    onChange(tolerance);
                  }}
                >
                  {tolerance.toPrecision(1)}%
                </Button>
              ))}
              <InputGroup
                size="xs"
                maxW="30%"
                _focusWithin={{
                  color: "brand.purple",
                }}
              >
                <Input
                  type="number"
                  min={DEFAULT_SLIPPAGE}
                  step={0.01}
                  value={value || undefined}
                  onChange={(e) => onChange(Number(e.target.value))}
                  placeholder="Custom"
                  borderColor="brand.deepBlue"
                  _focus={{
                    borderColor: "brand.purple",
                  }}
                  textStyle="minibutton"
                  fontSize="10px"
                />
                <InputRightElement pointerEvents="none" fontSize="sm">
                  <Text>%</Text>
                </InputRightElement>
              </InputGroup>
            </HStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SlippagePopover;
