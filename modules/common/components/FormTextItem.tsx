import React, { FC, useState, useRef } from "react";
import { Textarea, Text, Input, Box, Flex, CSSObject } from "@chakra-ui/react";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from "constants/proposals";
import { validateJsonInput, validateUrl } from "modules/common/helpers";
import ErrorBubble from "components/common/ErrorBubble";
import ExecMsgExamples from "components/proposal/ExecMsgExamples";
import UnderlineButton from "components/UnderlineButton";

type Props = {
  type: "input" | "textarea";
  id: string;
  title?: string;
  value?: string;
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

const formErrorMsg = (id, error) => {
  switch (id) {
    case "title":
    case "description": {
      if (error.type === "minLength") {
        return `The ${id} must have at least ${
          id === "title" ? MIN_TITLE_LENGTH : MIN_DESCRIPTION_LENGTH
        } characters`;
      } else if (error.type === "maxLength") {
        return `The ${id} must have maximum ${
          id === "title" ? MAX_TITLE_LENGTH : MAX_DESCRIPTION_LENGTH
        } characters`;
      }

      return "This input is required";
    }
    case "msg":
      return "Inccorectly formatted JSON";
    case "link":
      return "Inccorectly formatted URL";
  }

  return "This input is required";
};

const formValidationRule = (id) => {
  switch (id) {
    case "title":
      return {
        required: true,
        minLength: MIN_TITLE_LENGTH,
        maxLength: MAX_TITLE_LENGTH,
      };
    case "description":
      return {
        required: true,
        minLength: MIN_DESCRIPTION_LENGTH,
        maxLength: MAX_DESCRIPTION_LENGTH,
      };
    case "msg":
      return {
        required: false,
        validate: (value: string | null) =>
          !value ||
          value.length === 0 ||
          (value.length > 0 && validateJsonInput(value)),
      };
    case "link":
      return {
        required: false,
        validate: (value: string | null) =>
          !value ||
          value.length === 0 ||
          (value.length > 0 && validateUrl(value)),
      };
  }

  return {
    required: false,
  };
};

const FormTextItem: FC<Props> = ({
  type = "input",
  id,
  formRegister,
  title,
  value = "",
  placeholder = "Type here",
  _placeholder = { fontStyle: "italic", color: "white.400" },
  fontSize = null,
  fontFamily = null,
  error,
  onChange,
}) => {
  const [showExamples, setShowExamples] = useState(false);
  const msgRef = useRef(null);

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
      <Flex mb="2" ml="1">
        {title && <Text fontSize="sm">{title}</Text>}
        {id === "msg" && (
          <UnderlineButton
            ml="auto"
            h="inherit"
            color="proposalColours.purpleAlt"
            fontWeight="400"
            onClick={() => setShowExamples(!showExamples)}
          >
            {showExamples && "close example code"}
            {!showExamples && "show example code"}
          </UnderlineButton>
        )}
      </Flex>
      {showExamples && (
        <ExecMsgExamples
          focusTextArea={() => {
            if (msgRef.current) {
              msgRef.current.focus();
            }
          }}
        />
      )}
      {type === "input" && (
        <Input
          id={id}
          {...InputStyles(error)}
          {...formRegister(id, formValidationRule(id))}
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
          {...formRegister(id, formValidationRule(id))}
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
          ref={id === "msg" ? msgRef : null}
        />
      )}
      {error && (
        <ErrorBubble text="!" position="absolute" top="60px" right="48px" />
      )}
      {error && (
        <Text mt="2" color="errors.main" fontSize="sm">
          {formErrorMsg(id, error)}
        </Text>
      )}
    </Box>
  );
};

export default FormTextItem;
