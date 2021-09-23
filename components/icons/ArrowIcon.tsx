import React from "react";

export default function ArrowIcon(props: any) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="15" cy="15" r="15" fill="black" />
      <path
        d="M3.49988 15C3.49988 8.64873 8.64861 3.5 14.9999 3.5C21.3512 3.5 26.4999 8.64873 26.4999 15C26.4999 21.3513 21.3512 26.5 14.9999 26.5C8.64861 26.5 3.49988 21.3513 3.49988 15Z"
        stroke="white"
        strokeOpacity="0.9"
        fill="currentColor"
      />
      <path d="M15 21L13.2679 17.4654H16.7321L15 21Z" fill="white" />
      <path d="M15.5001 9H14.5001V17.6115H15.5001V9Z" fill="white" />
    </svg>
  );
}
