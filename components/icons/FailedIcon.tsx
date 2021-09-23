import React from "react";

export default function FailedIcon(props: any) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.500001 12C0.500002 5.64873 5.64873 0.500002 12 0.500003C18.3513 0.500003 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.500001 12Z"
        stroke="#EE5467"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.999 12.9424L15.7709 16.7144L16.7138 15.7716L12.9418 11.9996L16.7134 8.22804L15.7706 7.28523L11.999 11.0568L8.22847 7.28632L7.28566 8.22913L11.0562 11.9996L7.2853 15.7705L8.22811 16.7133L11.999 12.9424Z"
        fill="#EE5467"
      />
    </svg>
  );
}
