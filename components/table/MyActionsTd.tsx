import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

import { useLockdropLogic } from "modules/lockdrop";

type Props = {
  name: string;
  duration: number;
};

const MyActionsTd: FC<Props> = ({ name, duration }) => {
  const logic = useLockdropLogic({ lpToken: name, duration });

  if (!logic.canWithdraw) {
    return (
      <Flex justify="flex-end">
        <Button as="a" variant="silent" size="sm" isFullWidth isDisabled>
          Locked
        </Button>
      </Flex>
    );
  }

  return (
    <Flex justify="flex-end">
      <Link href={`/unlock/${name}/${duration}`} passHref>
        <Button as="a" variant="primary" size="sm" isFullWidth>
          Manage
        </Button>
      </Link>
    </Flex>
  );
};

export default MyActionsTd;
