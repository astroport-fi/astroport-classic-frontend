import React from "react";

export default function MenuNav(props: any) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99951 14L21.9995 14"
        stroke="url(#paint0_linear_5057_69641)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.99951 8L21.9995 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.99951 20L21.9995 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5057_69641"
          x1="9.14237"
          y1="14"
          x2="22.8567"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B5ACFF" />
          <stop offset="0.572917" stopColor="#5643F2" />
          <stop offset="1" stopColor="#5643F2" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
