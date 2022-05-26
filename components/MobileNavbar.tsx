import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Image,
  Flex,
  chakra,
  Text,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import {
  MOBILE_NAV_HEIGHT,
  MOBILE_MAIN_PAGES,
  MOBILE_SECONDARY_PAGES,
} from "constants/constants";

import MenuNav from "components/icons/MenuNav";
import MenuBack from "components/icons/MenuBack";

const HorizontalBar = ({
  isPrimary,
  title,
  cycleOpen,
  back,
}: {
  isPrimary: boolean;
  title: string;
  cycleOpen: (i?: number | undefined) => void;
  back: () => void;
}) => {
  return (
    <Flex
      pos="fixed"
      width="100%"
      height={MOBILE_NAV_HEIGHT}
      bg="brand.deepBlue"
      borderBottom="1px solid"
      borderColor="white.200"
      color="white"
      align="center"
      zIndex="999"
    >
      {isPrimary && (
        <Button
          variant="simple"
          height="100%"
          p="3"
          onClick={() => cycleOpen()}
        >
          <MenuNav />
        </Button>
      )}
      {!isPrimary && (
        <Button variant="simple" height="100%" p="3" onClick={() => back()}>
          <MenuBack />
        </Button>
      )}
      <Text fontSize="large">{title}</Text>
    </Flex>
  );
};

const MobileNavbar: FC = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const { asPath, back } = useRouter();

  const mainPage = MOBILE_MAIN_PAGES.find((page) => asPath.startsWith(page.to));
  const secondaryPage = MOBILE_SECONDARY_PAGES.find((page) =>
    asPath.match(page.regex)
  );
  const isPrimary = secondaryPage ? false : true;
  const title = secondaryPage
    ? secondaryPage.name
    : mainPage
    ? mainPage.name
    : "";

  // prevents scroll on back for mobile
  window.history.scrollRestoration = "manual";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.2 } }}
          >
            <Flex justifyContent="space-between" p="6">
              <Image src="/logo.svg" w="8" alt="WhiteWhale Logo" />
              <CloseButton
                borderWidth="1px"
                borderColor="white"
                color="white"
                borderRadius="full"
                _focus={{ boxShadow: "none" }}
                onClick={() => cycleOpen()}
              />
            </Flex>
            <Flex flexDirection="column">
              {MOBILE_MAIN_PAGES.map(({ name, to }, index) => {
                const wrapperStyle = asPath.includes(to)
                  ? { bg: "brand.purple", borderEndRadius: "xl" }
                  : null;

                return (
                  <Link key={index} href={to} passHref>
                    <chakra.a href={to} onClick={() => cycleOpen()}>
                      <Text
                        display="inline-flex"
                        my="2"
                        px="6"
                        py="3"
                        color="white"
                        {...wrapperStyle}
                      >
                        {name}
                      </Text>
                    </chakra.a>
                  </Link>
                );
              })}
            </Flex>
          </motion.nav>
        )}
      </AnimatePresence>
      <HorizontalBar
        isPrimary={isPrimary}
        title={title}
        back={back}
        cycleOpen={cycleOpen}
      />
    </>
  );
};

export default MobileNavbar;
