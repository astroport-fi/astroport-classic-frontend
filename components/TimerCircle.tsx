import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const transition = { duration: 1, ease: "easeInOut" };

type Props = {
  percent?: number;
};

const TimerCircle: FC<Props> = ({ percent = 0 }) => {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left="0"
        top="0"
        zIndex={2}
        transform="scale(-1, 1)"
        opacity={percent == 0 ? 0 : 1}
      >
        <svg
          width="100%"
          viewBox="0 0 230 217"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M171.028 212C204.49 192.631 227 156.444 227 115C227 53.1441 176.856 3 115 3C53.1441 3 3 53.1441 3 115C3 158.086 27.3296 195.49 63 214.222"
            stroke="url(#paint0_linear_483:12967)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percent }}
            transition={transition}
          />
          <defs>
            <linearGradient
              id="paint0_linear_483:12967"
              x1="5.63087"
              y1="168.959"
              x2="223.889"
              y2="168.959"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.520833" stopColor="#15BFA9" />
              <stop offset="1" stopColor="#5E4BB1" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
      <Box position="absolute" left="0" top="0" zIndex={1}>
        <svg
          width="100%"
          viewBox="0 0 230 217"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M171.028 212C204.49 192.631 227 156.444 227 115C227 53.1441 176.856 3 115 3C53.1441 3 3 53.1441 3 115C3 158.086 27.3296 195.49 63 214.222"
            stroke="rgba(0,0,0,.2)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default TimerCircle;
