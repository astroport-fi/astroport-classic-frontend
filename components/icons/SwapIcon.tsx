import React from "react";

export default function SwapIcon(props: any) {
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
        stroke="white"
        strokeOpacity="0.9"
      />
      <path d="M6 9L9.53458 7.26795L9.53458 10.7321L6 9Z" fill="white" />
      <rect
        x="18"
        y="8.5"
        width="1"
        height="8.61154"
        transform="rotate(90 18 8.5)"
        fill="white"
      />
      <path d="M18 15L14.4654 16.7321L14.4654 13.2679L18 15Z" fill="white" />
      <rect
        x="6"
        y="15.5"
        width="1"
        height="8.61154"
        transform="rotate(-90 6 15.5)"
        fill="white"
      />
    </svg>
  );
}
