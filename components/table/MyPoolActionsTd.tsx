import React, { FC } from "react";
import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";

type Props = {
  contract: string;
};

const MyPoolActionsTd: FC<Props> = ({ contract }) => {
  return (
    <HStack justify="flex-end">
      <Link href={`/pools/${contract}`} passHref>
        <Button as="a" variant="primary" size="sm" px="0" minW="40">
          Manage
        </Button>
      </Link>
    </HStack>
  );
};

export default MyPoolActionsTd;
