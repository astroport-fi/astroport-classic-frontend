import React, { FC } from "react";
import { Textarea, Text, Input, Box, CSSObject } from "@chakra-ui/react";

type Props = {
  type: "input" | "textarea";
  title?: string;
  value?: string;
  placeholder?: string;
  _placeholder?: CSSObject;
  fontSize?: string;
  fontFamily?: string | null;
  onChange: (text?: string) => void;
};

const InputStyles = {
  borderWidth: "1px",
  borderColor: "white.100",
  bg: "black.400",
  color: "white.600",
};

const FormTextItem: FC<Props> = ({
  type = "input",
  value = "",
  title,
  placeholder = "Type here",
  _placeholder = { fontStyle: "italic", color: "white.400" },
  fontSize = null,
  fontFamily = null,
  onChange,
}) => {
  return (
    <Box
      bg="brand.defaultTable"
      py={["2", "5"]}
      px={["4", "8"]}
      mb="5"
      borderWidth="none"
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
          {...InputStyles}
          value={value}
          fontFamily={fontFamily}
          placeholder={placeholder}
          _placeholder={_placeholder}
          fontSize={fontSize}
          onChange={(e) => onChange(e.target.value)}
          h="12"
        />
      )}
      {type === "textarea" && (
        <Textarea
          {...InputStyles}
          value={value}
          fontFamily={fontFamily}
          placeholder={placeholder}
          _placeholder={_placeholder}
          fontSize={fontSize}
          onChange={(e) => onChange(e.target.value)}
          h="40"
          resize="none"
        />
      )}
    </Box>
  );
};

export default FormTextItem;
