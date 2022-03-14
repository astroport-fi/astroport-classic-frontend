import React from "react";
import Head from "next/head";
import { BrowserView, MobileView } from "react-device-detect";

import Page from "components/pages/error";

const HideOnMobile = (props) => {
  return (
    <>
      <BrowserView>{props.children}</BrowserView>
      <MobileView>
        <Head>
          <title>Error Page</title>
        </Head>
        <Page statusCode={404} />
      </MobileView>
    </>
  );
};

export default HideOnMobile;
