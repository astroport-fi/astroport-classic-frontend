import React, { FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ArrowLeftIcon from "components/icons/ArrowLeftIcon";

type Props = {};

const BackButton: FC<Props> = () => {
  const router = useRouter();

  return (
    <IconButton
      onClick={router.back}
      aria-label="Back"
      icon={<ArrowLeftIcon />}
      size="xs"
      isRound
      variant="icon"
    />
  );
};

export default BackButton;
