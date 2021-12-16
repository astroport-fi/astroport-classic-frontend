import React from "react";
import { Icon } from "@chakra-ui/react";

export default function CloseModalIcon(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z"
        fill="white"
        fillOpacity="0.1"
      />
      <path
        d="M0.500001 12C0.500002 5.64873 5.64873 0.500002 12 0.500003C18.3513 0.500003 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.500001 12Z"
        fill="currentColor"
        stroke="white"
        strokeOpacity="0.9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9424 12.4864L16.7144 8.71441L15.7716 7.7716L11.9996 11.5436L8.22804 7.77196L7.28523 8.71477L11.0568 12.4864L7.28632 16.2569L8.22913 17.1997L11.9996 13.4292L15.7705 17.2001L16.7133 16.2572L12.9424 12.4864Z"
        fill="white"
      />
    </Icon>
  );
}
