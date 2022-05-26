import React, { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { MOBILE_SCROLL_Y_OFFSET, MOBILE_NAV_HEIGHT } from "constants/constants";

import ChevronUpIcon from "components/icons/ChevronUpIcon";

const ScrollTopArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function () {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > MOBILE_SCROLL_Y_OFFSET) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= MOBILE_SCROLL_Y_OFFSET) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Center
      pos="fixed"
      display={showScroll ? "flex" : "none"}
      cursor="pointer"
      backdropFilter="blur(100px)"
      bg="brand.purple"
      w="3rem"
      h="3rem"
      bottom={MOBILE_NAV_HEIGHT}
      mb="5px"
      right="10px"
      borderRadius="full"
      zIndex="101"
      onClick={scrollTop}
    >
      <ChevronUpIcon width="1.25rem" height="1.25rem" />
    </Center>
  );
};

export default ScrollTopArrow;
