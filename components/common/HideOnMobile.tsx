import React from "react";
import { BrowserView, isMobile } from "react-device-detect";

import { useRouter } from "next/router";

const HideOnMobile = (props) => {
  const router = useRouter();

  if (isMobile) {
    router.push("404");
  }

  return <BrowserView>{props.children}</BrowserView>;
};

export default HideOnMobile;
