import React, { FC } from "react";
import {
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

const Search: FC<Props> = ({ iconStyle, containerStyle, ...props }) => {
  return (
    <Stack spacing={4}>
      <InputGroup size="sm" {...containerStyle}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon {...iconStyle} />
        </InputLeftElement>
        <Input {...props} />
      </InputGroup>
    </Stack>
  );
};

export default Search;
