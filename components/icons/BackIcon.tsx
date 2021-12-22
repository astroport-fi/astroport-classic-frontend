import React from "react";
import { Icon } from "@chakra-ui/react";

export default function BackIcon(props: any) {
  return (
    <Icon viewBox="0 0 12 12" {...props}>
      <path d="M0,6l3.5-1.7v3.5L0,6z" fill="currentColor" />
      <rect x="3.4" y="5.5" width="8.6" height="1" fill="currentColor" />
    </Icon>
  );
}
