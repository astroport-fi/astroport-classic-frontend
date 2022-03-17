import React, { FC, useCallback, useState } from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  VStack,
  NumberInput,
  NumberInputField,
  HStack,
  Text,
  useBreakpointValue,
  PlacementWithLogical,
} from "@chakra-ui/react";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import GearIcon from "components/icons/GearIcon";
import { clampValue } from "@chakra-ui/utils";

type Props = {
  value: number;
  onChange: (value: number) => void;
  expertMode: boolean;
  onExpertModeChange: (expertMode: boolean) => void;
};

const tolerances = [0.1, 0.5, 1, 2];
const minSlippage = 0.01;
const maxSlippage = 50;

const SlippagePopover: FC<Props> = ({
  value,
  onChange,
  expertMode,
  onExpertModeChange,
}) => {
  const placement = useBreakpointValue({
    base: "bottom-end",
    md: "left",
  }) as PlacementWithLogical;

  const [stringValue, setStringValue] = useState(value.toFixed(2));

  const setValue = useCallback(
    (value: string) => {
      //Replace all '.' but not first.
      value = value.replace(/(?<=\..*)\./g, "");

      //Replace minus character
      value = value.replace("-", "");

      // Allow only 2 decimals
      const i = value.indexOf(".");
      if (i >= 0) {
        value = value.substring(0, i + 3);
      }

      const f = parseFloat(value);
      if (!isNaN(f)) {
        // clamp value
        if (f > maxSlippage || f < minSlippage) {
          return;
        }

        onChange(f);
      }

      setStringValue(value);
    },
    [onChange, setStringValue]
  );

  const onBlurInput = () => {
    let f = parseFloat(stringValue);
    if (isNaN(f) || f === 0) {
      setStringValue(minSlippage.toFixed(2));
      onChange(minSlippage);
    } else {
      f = clampValue(f, minSlippage, maxSlippage);
      setStringValue(f.toFixed(2));
      onChange(f);
    }
  };

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
                    setValue(tolerance.toFixed(2));
                  }}
                >
                  {tolerance.toPrecision(1)}%
                </Button>
              ))}
            </HStack>
            <InputGroup
              maxW={["50%", null, "30%"]}
              _focusWithin={{
                color: "brand.purple",
              }}
            >
              <NumberInput
                w="100%"
                step={0.01}
                value={stringValue}
                onChange={setValue}
                onBlur={onBlurInput}
              >
                <NumberInputField
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
              </NumberInput>
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
