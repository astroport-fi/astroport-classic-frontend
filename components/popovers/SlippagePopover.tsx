import React, { FC } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import GearIcon from "components/icons/GearIcon";

type Props = {
  value: number;
  onChange: (value: number) => void;
  expertMode: boolean;
  onExpertModeChange: (expertMode: boolean) => void;
};

const tolerances = [DEFAULT_SLIPPAGE, 0.5, 1, 2];

const SlippagePopover: FC<Props> = ({
  value,
  onChange,
  expertMode,
  onExpertModeChange,
}) => {
  return (
    <PopoverWrapper
      title="Settings"
      placement="left"
      triggerElement={() => (
        <IconButton
          aria-label="Settings"
          icon={<GearIcon />}
          size="xs"
          isRound
          variant="icon"
        />
      )}
    >
      <VStack mt="2" spacing="6" align="flex-start">
        <Box>
          <Text textStyle="minibutton">Expert mode</Text>
          <HStack mt={3}>
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
        </Box>
        <Box>
          <Text textStyle="minibutton">Set slippage tolerance</Text>
          <HStack mt={3} algign="stretch">
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
                color="#788DB2"
                fontWeight="700"
                borderColor="#788DB2"
                _hover={{
                  borderColor: "brand.dark",
                }}
                _focus={{
                  color: "brand.purple",
                  borderColor: "brand.purple",
                }}
                textStyle="minibutton"
                fontSize="10px"
                h="7"
              />
              <InputRightElement h="7" pointerEvents="none" fontSize="xs">
                <Text>%</Text>
              </InputRightElement>
            </InputGroup>
          </HStack>
        </Box>
      </VStack>
    </PopoverWrapper>
  );
};

export default SlippagePopover;
