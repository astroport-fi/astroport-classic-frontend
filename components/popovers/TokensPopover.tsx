import React, { FC } from "react";
import {
  useDisclosure,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Flex,
} from "@chakra-ui/react";
import {
  useTokenTooltip,
  handleBigAndTinyAmount,
  handleBigPercentage,
  TokenTooltip,
} from "modules/common";
import { Rewards } from "modules/pool";

type Props = {
  type?: string | null;
  format?: string;
  tokenTooltip?: TokenTooltip;
};

const TokensPopover: FC<Props> = ({ type, format, tokenTooltip, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const data = useTokenTooltip(
    type,
    tokenTooltip?.poolAssets,
    tokenTooltip?.myLiquidity,
    tokenTooltip?.totalLiquidity
  );

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen && data != null}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        paddingX="12px"
        paddingY="12px !important"
        bg="#0c516d"
        borderColor="rgba(255, 255, 255, 0.1)"
        border="2px"
        borderRadius="4px"
        boxShadow="4px 4px 10px rgba(0, 13, 55, 0.5)"
      >
        <PopoverBody border={2}>
          {data?.map((row) => (
            <Flex key={row.label}>
              <Text flex={1} fontSize="xs" color="#fff">
                Amount {row.label}:
              </Text>
              <Text
                pl="2"
                w="16"
                align="right"
                fontSize="xs"
                color="rgba(255, 255, 255, 0.6)"
              >
                {handleBigAndTinyAmount(row.value, "0,0")}
              </Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TokensPopover;
