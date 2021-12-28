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
  useBreakpointValue,
  PlacementWithLogical,
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

const tolerances = [0.1, 0.5, 1, 2];

const SlippagePopover: FC<Props> = ({
  value,
  onChange,
  expertMode,
  onExpertModeChange,
}) => {
  const placement = useBreakpointValue({
    base: "top-start",
    md: "left",
  }) as PlacementWithLogical;

  return (
    <PopoverWrapper
      title="Settings"
      placement={placement}
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
      <VStack mt="2" spacing="6" align="flex-start" w={["56", null, "96"]}>
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
          <HStack
            mt={3}
            spacing={["0", null, "3"]}
            align="stretch"
            flexWrap="wrap"
          >
            <HStack mb={["3", null, "0"]}>
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
            </HStack>
            <InputGroup
              maxW={["100%", null, "30%"]}
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
