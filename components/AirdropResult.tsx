import React, { FC } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

import { useAirdrop } from "modules/airdrop";
import * as animationData from "libs/animations/loop.json";

import AirdropSuccess from "components/AirdropSuccess";
import AirdropFailed from "components/AirdropFailed";

const AirdropResult: FC = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const { isLoading, data } = useAirdrop(address);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const animationSize = useBreakpointValue({ base: 150, md: 400 });

  const handleClose = () => {
    router.back();
  };

  const renderAirdrop = () => {
    if (!isLoading && (data == null || data.length == 0)) {
      return <AirdropFailed onCloseClick={handleClose} />;
    }

    console.log(data);

    return (
      <AirdropSuccess
        data={data}
        address={address}
        onCloseClick={handleClose}
      />
    );
  };

  if (isLoading) {
    return (
      <Box m="0 auto" pt="12">
        <Lottie
          options={defaultOptions}
          height={animationSize}
          width={animationSize}
          isStopped={false}
          isPaused={false}
        />
      </Box>
    );
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">{renderAirdrop()}</Box>
      </Flex>
    </Box>
  );
};

export default AirdropResult;
