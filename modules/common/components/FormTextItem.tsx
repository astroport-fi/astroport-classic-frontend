import React, { FC } from "react";
import {
  Textarea,
  Text,
  Input,
  Box,
  Flex,
  Circle,
  CSSObject,
} from "@chakra-ui/react";

type Props = {
  type: "input" | "textarea";
  id: string;
  title?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  _placeholder?: CSSObject;
  fontSize?: string;
  fontFamily?: string | null;
  formRegister: any;
  error?: any;
  onChange: (text?: string) => void;
};

const InputStyles = (hasErrors?: any) => {
  return {
    borderWidth: "1px",
    borderColor: hasErrors ? "errors.main" : "white.100",
    bg: "black.400",
    color: "white.600",
  };
};

const ErrorBubble = () => {
  return (
    <Circle
      position="absolute"
      top="60px"
      right="48px"
      background="errors.light"
      borderWidth="1px"
      color="errors.dark"
      borderColor="errors.dark"
      w="24px"
      h="24px"
      align="center"
    >
      !
    </Circle>
  );
};

const FormTextItem: FC<Props> = ({
  type = "input",
  id,
  formRegister,
  title,
  value = "",
  required = null,
  placeholder = "Type here",
  _placeholder = { fontStyle: "italic", color: "white.400" },
  fontSize = null,
  fontFamily = null,
  error,
  onChange,
}) => {
  return (
    <Box
      bg="brand.defaultTable"
      py={["2", "5"]}
      px={["4", "8"]}
      mb="5"
      border="0"
      borderRadius="xl"
      position="relative"
      color="white"
    >
      {title && (
        <Text mb="2" ml="1" fontSize="sm">
          {title}
        </Text>
      )}
      {type === "input" && (
        <Input
          id={id}
          {...InputStyles(error)}
          {...formRegister(id, { required, minLength: 1 })}
          value={value}
          fontFamily={fontFamily}
          placeholder={placeholder}
          _placeholder={_placeholder}
          _hover={error ? { borderColor: "errors.main" } : null}
          _focus={error ? { borderColor: "errors.main" } : null}
          fontSize={fontSize}
          onChange={(e) => onChange(e.target.value)}
          h="12"
        />
      )}
      {type === "textarea" && (
        <Textarea
          id={id}
          {...InputStyles(error)}
          {...formRegister(id, { required, minLength: 1 })}
          value={value}
          fontFamily={fontFamily}
          placeholder={placeholder}
          _placeholder={_placeholder}
          _hover={error ? { borderColor: "errors.main" } : null}
          _focus={error ? { borderColor: "errors.main" } : null}
          fontSize={fontSize}
          onChange={(e) => onChange(e.target.value)}
          h="40"
          resize="none"
        />
      )}
      {error && <ErrorBubble />}
      {error && (
        <Text mt="2" color="errors.main" fontSize="sm">
          This input is required
        </Text>
      )}
    </Box>
  );
};

export default FormTextItem;
