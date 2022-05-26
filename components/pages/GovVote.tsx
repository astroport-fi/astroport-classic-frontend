import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { GovVoteForm } from "modules/governance";

type Props = {
  id: string;
  action: string;
};

const GovVote: FC<Props> = ({ id, action }) => {
  return (
    <Flex h="100%" justify="center">
      <Box
        maxW="470px"
        w="full"
        pt="6"
        mx="6"
        mt={[25, 25, 10]}
        mb={[75, 75, 10]}
      >
        <GovVoteForm id={id} action={action} />
      </Box>
    </Flex>
  );
};

export default GovVote;
