import React, { FC, useRef, useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

type Props = {
  value: any;
  onDataHandle?: (val: any) => any;
  onChange?: (val: any) => void;
  options: any[];
  withCustom?: boolean;
};

const InputOptions: FC<Props> = ({
  value,
  onChange,
  onDataHandle = (val) => val,
  options,
  withCustom,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [customValue, setCustomValue] = useState<boolean>(false);

  return (
    <Flex justifyContent="flex-start" alignItems="flex-start">
      {options.map((option) => (
        <Button
          type="button"
          key={option}
          onClick={() => {
            setCustomValue(false);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            onChange && onChange(option);
          }}
          w="auto"
          h="auto"
          py={1}
          px={4}
          bg={
            !customValue && value == option ? "brand.purple" : "whiteAlpha.100"
          }
          textAlign="center"
          borderColor="transparent"
          borderWidth={1}
          borderRadius="4px"
          fontWeight="medium"
          fontSize="sm"
          lineHeight={1}
          mr={2}
          _hover={{ bg: "brand.purple" }}
        >
          {option}
        </Button>
      ))}
      {withCustom && (
        <Input
          ref={inputRef}
          onChange={() => {
            setCustomValue(true);
          }}
          onBlur={(e) => {
            const value = onDataHandle(e.target.value);
            if (inputRef.current) {
              inputRef.current.value = value;
            }
            onChange && onChange(value);
          }}
          w={24}
          h="auto"
          py={1}
          px={4}
          textAlign="center"
          bgColor="blackAlpha.400"
          borderColor="whiteAlpha.300"
          borderWidth={1}
          borderRadius="4px"
          fontWeight="medium"
          fontSize="sm"
          lineHeight={1}
          _placeholder={{ textColor: "whiteAlpha.600" }}
          placeholder="Custom"
        />
      )}
    </Flex>
  );
};

export default InputOptions;
