import React from "react";

export default function MenuNav(props: any) {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="28" height="28" rx="8" fill="#242336" fillOpacity="0.8" />
      <path
        d="M15.5555 19.4444L10.8182 14.7071C10.4277 14.3166 10.4277 13.6834 10.8182 13.2929L15.5555 8.55554"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M27.2222 14L13.2222 14"
        stroke="url(#paint0_linear_5333_7009)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5333_7009"
          x1="28.2222"
          y1="14"
          x2="12.2222"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B5ACFF" />
          <stop offset="0.588542" stopColor="#5643F2" />
          <stop offset="1" stopColor="#5643F2" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
