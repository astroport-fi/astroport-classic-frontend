import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useAirdrop } from "modules/airdrop";
import AirdropSuccess from "components/AirdropSuccess";
import AirdropFailed from "components/AirdropFailed";

const AirdropResult: FC = () => {
  const router = useRouter();
  const address = router.query.address as string;
  // const { data, isLoading } = useAirdrop(address);
  const { isLoading, data } = useAirdrop(address);

  const handleClose = () => {
    router.back();
  };

  const renderAirdrop = () => {
    if (!isLoading && data == null) {
      return <AirdropFailed onCloseClick={handleClose} />;
    }

    return (
      <AirdropSuccess
        amount={data?.amount}
        address={address}
        onCloseClick={handleClose}
      />
    );
  };

  if (isLoading) {
    return (
      <Box m="0 auto" pt="12">
        <Flex gridGap="8">
          <Box w="container.sm">Loading...</Box>
        </Flex>
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
