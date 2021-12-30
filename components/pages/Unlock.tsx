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
    <Box m="0 auto" py="12">
      <Flex gridGap="8">
        <Box w="container.sm">
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
