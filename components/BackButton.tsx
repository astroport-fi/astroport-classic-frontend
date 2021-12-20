import React, { FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

import BackIcon from "components/icons/BackIcon";

type Props = {};

const BackButton: FC<Props> = () => {
  const router = useRouter();

  return (
    <IconButton
      aria-label="Back"
      icon={<BackIcon w="1.5rem" h="1.5rem" />}
      variant="icon"
      onClick={router.back}
    />
  );
};

export default BackButton;
