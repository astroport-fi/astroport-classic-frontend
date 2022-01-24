import React from "react";
import { InputGroup, InputLeftElement, Input, Flex } from "@chakra-ui/react";

import SearchIcon from "components/icons/SearchIcon";

const PoolFilters = ({ filter, setFilter }) => {
  return (
    <Flex justify="flex-end">
      <InputGroup w="240px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="white" opacity="0.4" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Token or Address"
          variant="filled"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </InputGroup>
    </Flex>
  );
};

export default PoolFilters;
