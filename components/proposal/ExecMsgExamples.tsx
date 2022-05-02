import React, { FC, useState } from "react";
import { Flex, Box, Text, Button, Tooltip } from "@chakra-ui/react";
import { proposals, ProposalExample } from "constants/proposalMsgExamples";
import Copy from "components/icons/Copy";

type Props = {
  focusTextArea: () => void;
};

type ButtonProps = {
  item: ProposalExample;
  value: number;
  selected: number;
  onClickItem: (key: number) => void;
};

const ButtonTooltip: FC<ButtonProps> = ({
  item,
  value,
  selected,
  onClickItem,
}) => {
  const bg = selected === value ? "brand.purple" : "white.100";

  return (
    <Tooltip
      bg={bg}
      gutter={15}
      borderRadius="lg"
      maxW="200px"
      color="white.600"
      label={item.desc}
    >
      <Button
        h="30px"
        minW="30px"
        p="0"
        mx="1"
        bg={bg}
        _hover={{ bg }}
        _active={{ bg }}
        _focus={{ bg }}
        onClick={() => onClickItem(value)}
      >
        {value + 1}
      </Button>
    </Tooltip>
  );
};

const ExecMsgExamples: FC<Props> = ({ focusTextArea }) => {
  const [exampleItem, setExampleItem] = useState(0);

  return (
    <Box position="relative" bg="black.200" my="5" mx="1px" borderRadius="md">
      <Flex
        bg="#0b1334"
        position="absolute"
        p="15px"
        top="0"
        right="10px"
        align="center"
      >
        <Text fontSize="sm">Example:</Text>
        <Box mx="3">
          {proposals.map((item, i) => {
            return (
              <ButtonTooltip
                item={item}
                key={i}
                value={i}
                selected={exampleItem}
                onClickItem={(key) => {
                  setExampleItem(key);
                }}
              />
            );
          })}
        </Box>
        <Button
          align="center"
          bg="white.100"
          h="30px"
          px="3"
          borderRadius="md"
          _hover={{ bg: "white.100" }}
          _active={{ bg: "white.100" }}
          _focus={{ bg: "white.100" }}
          onClick={() => {
            navigator.clipboard.writeText(proposals[exampleItem]?.code || "");
            focusTextArea();
          }}
        >
          <Copy />
          <Text ml="2" color="white.800" fontWeight="500" fontSize="sm">
            copy
          </Text>
        </Button>
      </Flex>
      <Box p="4" overflowY="auto" maxHeight="260px" color="lightgreen">
        {proposals[exampleItem] && <pre>{proposals[exampleItem]?.code}</pre>}
      </Box>
    </Box>
  );
};

export default ExecMsgExamples;
