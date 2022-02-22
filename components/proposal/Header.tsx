import React, { FC } from "react";
import Link from "next/link";
import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";

import BackIcon from "components/icons/BackIcon";
import TwitterIcon from "components/icons/TwitterIcon";

type Props = {
  title: string;
  twitterLink: string;
};

const Header: FC<Props> = ({ title, twitterLink }) => {
  return (
    <Flex mb="5" justify="space-between">
      <HStack spacing={4}>
        <Link href="/governance" passHref>
          <IconButton
            aria-label="Back"
            size="xs"
            variant="icon"
            isRound
            icon={<BackIcon />}
          />
        </Link>
        <Text fontSize="xl">{title}</Text>
      </HStack>
      <IconButton
        aria-label="Tweet"
        size="xs"
        variant="icon"
        border="none"
        p="1"
        isRound
        icon={<TwitterIcon />}
        onClick={() => {
          window.open(twitterLink, "_blank");
        }}
      />
    </Flex>
  );
};

export default Header;
