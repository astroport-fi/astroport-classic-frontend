import React, { FC } from "react";
import { Box, Stack, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import NotFoundIllustration from "components/pages/error/NotFoundIllustration";
import ErrorIllustration from "components/pages/error/ErrorIllustration";

interface IProps {
  statusCode: number;
}

const IndexPageComponent: FC<IProps> = ({ statusCode }) => {
  const heightOfNavbar: string = "88px";
  const containerPadding: string = "1rem";
  const notFoundError = statusCode && statusCode == 404;

  console.error("The following error code happened:", statusCode);

  return (
    <Stack>
      <Flex
        minH={`calc(100vh - ${heightOfNavbar} - ${containerPadding}*2)`}
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={16} px={10} w="full" maxW="3xl" mx="auto">
          {notFoundError && <NotFoundIllustration width="100%" />}
          {!notFoundError && <ErrorIllustration width="100%" />}
          <Box>
            <Stack isInline align="center" justifyContent="center">
              <Box>
                <Link href="/" passHref>
                  <Button variant="primary" as="a">
                    Return to the home page
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default IndexPageComponent;
