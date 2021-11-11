import React, { FC } from "react";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type Props = {
  state: { globalFilter: any };
  setGlobalFilter: any;
};

const PoolTableFilter: FC<Props> = ({
  state: { globalFilter },
  setGlobalFilter,
}) => {
  return (
    <Stack spacing={4}>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          placeholder="Search Token or Address"
        />
        ,
      </InputGroup>
    </Stack>
  );
};

export default PoolTableFilter;
