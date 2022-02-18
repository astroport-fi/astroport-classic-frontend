import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";

import Vote from "components/Vote";

type Props = {
  id: string;
  action: string;
};

const GovVote: FC<Props> = ({ id, action }) => {
  return (
    <Flex h="100%" justify="center">
      <Box maxW="470px" w="full" m="0 auto" mt="10">
        <Vote id={id} action={action} />
      </Box>
    </Flex>
  );
};

export default GovVote;
