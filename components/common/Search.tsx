import React, { FC } from "react";
import {
  forwardRef,
  Input,
  InputProps,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { IconProps, SearchIcon } from "@chakra-ui/icons";

type Props = {
  iconStyle?: IconProps;
  containerStyle?: InputGroupProps;
} & InputProps;

const Search = forwardRef<Props, "div">(
  ({ iconStyle, containerStyle, size = "sm", ...props }, ref) => {
    return (
      <Stack spacing={4}>
        <InputGroup size={size} {...containerStyle}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon {...iconStyle} />
          </InputLeftElement>
          <Input {...props} ref={ref} />
        </InputGroup>
      </Stack>
    );
  }
);

export default Search;
