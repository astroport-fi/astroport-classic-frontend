import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import UnlockForm from "components/lockdrop/unlock/UnlockForm";

type Props = {
  lpToken: string;
  duration: number;
  astroLpToken: string;
};

const Unlock: FC<Props> = ({ lpToken, duration, astroLpToken }) => {
  return (
    <Box m="0 auto" pt="6">
      <Flex justify="center">
        <Box maxW="650px" mx="6" mt={[25, 25, 10]} mb={[100, 100, 25]} w="full">
          <UnlockForm
            lpToken={lpToken}
            duration={duration}
            astroLpToken={astroLpToken}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Unlock;
