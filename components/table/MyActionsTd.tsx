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
      <Flex justify={{ md: "flex-end" }}>
        <Button
          as="a"
          variant="secondary"
          size="sm"
          isFullWidth
          isDisabled={!logic.canWithdraw}
        >
          Unlock LP Tokens
        </Button>
      </Flex>
    );
  }

  return (
    <Flex justify={{ md: "flex-end" }}>
      <Link href={`/unlock/${name}/${duration}`} passHref>
        <Button as="a" variant="secondary" size="sm" isFullWidth>
          Unlock LP Tokens
        </Button>
      </Link>
    </Flex>
  );
};

export default MyActionsTd;
