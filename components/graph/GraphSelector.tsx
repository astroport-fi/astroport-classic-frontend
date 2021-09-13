import React, { FC, useMemo, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Stack,
  RadioGroup,
  Radio
} from "@chakra-ui/react";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { ISelect } from "types/common";

const GraphSelector: FC<ISelect> = ({list, value, setValue}) => {

  return (
    <Menu
      closeOnSelect={false}
    >
      <MenuButton
        as={Button}
        bg="white.100"
        color="white"
        borderRadius="full"
        borderWidth="px"
        borderColor="white.200"
        textAlign="left"
        fontSize="sm"
        fontWeight="medium"
        h="8"
        w="31"
        _active={{
          bg: 'white.200',
        }}
        _focus={{
          outline: 'none',
        }}
        _hover={{
          bg: 'white.200',
        }}
        rightIcon={<ChevronDownIcon width="1rem" height="1rem" />}
      >
        {value}
      </MenuButton>
      <MenuList
        color="#000"
        px="5"
      >
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column">
            {list.map((el) => (
              <Radio
                colorScheme="gray"
                key={el}
                value={el}
              >
                {el}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default GraphSelector;
