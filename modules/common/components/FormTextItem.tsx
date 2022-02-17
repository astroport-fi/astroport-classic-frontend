import React, { FC } from "react";
import { Textarea, Text, Input, Box } from "@chakra-ui/react";

type Props = {
  type: "input" | "textarea";
  title?: string;
  value?: string;
  placeholder?: string;
  onChange: (text?: string) => void;
};

const FormTextItem: FC<Props> = ({
  type = "input",
  value = "",
  title,
  placeholder = "type here",
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
          value={value}
          placeholder={placeholder}
          _placeholder={{ fontStyle: "italic" }}
          onChange={(e) => onChange(e.target.value)}
          borderWidth="1px"
          borderColor="white.200"
          bg="black.400"
          color="white.600"
          h="12"
        />
      )}
      {type === "textarea" && (
        <Textarea
          value={value}
          placeholder={placeholder}
          _placeholder={{ fontStyle: "italic" }}
          onChange={(e) => onChange(e.target.value)}
          borderWidth="1px"
          borderColor="white.200"
          bg="black.400"
          color="white.600"
          h="40"
          resize="none"
        />
      )}
    </Box>
  );
};

export default FormTextItem;
