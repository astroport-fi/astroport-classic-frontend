import React from "react";

export default function ArrowIcon(props) {
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
        fill="currentColor"
      />
      <path d="M12 18L10.2679 14.4654L13.7321 14.4654L12 18Z" fill="white" />
      <rect x="11.5" y="6" width="1" height="8.61154" fill="white" />
    </svg>
  );
}
