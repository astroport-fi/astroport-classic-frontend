import React from "react";

export default function BackIcon(props: any) {
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
        d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37259 24 1.90735e-06 18.6274 1.90735e-06 12C1.90735e-06 5.37258 5.37259 0 12 0Z"
        fill="white"
        fillOpacity="0.1"
      />
      <path
        d="M12 0.500001C18.3513 0.500002 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64872 23.5 0.5 18.3513 0.500001 12C0.500002 5.64873 5.64873 0.5 12 0.500001Z"
        fill="currentColor"
        stroke="white"
        strokeOpacity="0.9"
      />
      <path d="M6 12L9.53458 10.2679L9.53458 13.7321L6 12Z" fill="white" />
      <rect
        x="18"
        y="11.5"
        width="1"
        height="8.61154"
        transform="rotate(90 18 11.5)"
        fill="white"
      />
    </svg>
  );
}
