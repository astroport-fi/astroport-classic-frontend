import { extendTheme } from "@chakra-ui/react";

import Modal from "./modal";
import Popover from "./popover";
import Badge from "./badge";
import Tooltip from "./tooltip";
import Text from "./text";
import Button from "./button";
import Tabs from "./tabs";
import NumberInput from "./numberInput";
import Heading from "./heading";
import Menu from "./menu";
import Slider from "./slider";
import Input from "./input";
import Alert from "./alert";

export default extendTheme({
  fonts: {
    heading:
      "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    mono: "Menlo, monospace",
  },
  components: {
    Modal,
    Popover,
    Tooltip,
    Text,
    Badge,
    Button,
    Heading,
    NumberInput,
    Slider,
    Tabs,
    Menu,
    Input,
    Alert,
  },
  fontSizes: {
    "2xs": "0.625rem",
    // xs: "0.6875rem",
    sm: "0.8125rem",
    md: "1rem",
    xl: "1.25rem",
  },
  colors: {
    green: { 500: "#7FE6A2" },
    red: {
      300: "rgba(239, 81, 119, 0.3)",
      500: "#EF5177",
    },
    orange: {
      500: "#E79B40",
    },
    white: {
      50: "rgba(255,255,255,0.05)",
      100: "rgba(255,255,255,0.1)",
      200: "rgba(255,255,255,0.2)",
      300: "rgba(255,255,255,0.3)",
      400: "rgba(255,255,255,0.4)",
      500: "rgba(255,255,255,0.5)",
      600: "rgba(255,255,255,0.6)",
      700: "rgba(255,255,255,0.7)",
      800: "rgba(255,255,255,0.8)",
      900: "rgba(255,255,255,0.9)",
    },
    black: {
      100: "rgba(0,0,0,0.2)",
      200: "rgba(0,0,0,0.2)",
    },
    tile: {
      dark: "rgba(0,13,55,0.8)",
      turquoise: "rgba(89,183,221,0.8)",
      blue: "rgba(22,41,230,0.8)",
    },
    brand: {
      purple: "#5643F2",
      lightPurple: "#83B3FD",
      teal: "#A1F4EF",
      dark: "#000D37",
      turquoise: "#59B7DD",
      blue: "#1121B8",
      lightBlue: "rgba(131,179,253,0.3)",
      deepBlue: "#000D37",
      defaultTable: "#0d1841",
    },
    otherColours: {
      green: "#7FE6A2",
      overlay: "#C2D9FF",
    },
  },
  textStyles: {
    h3: {
      fontWeight: "medium",
      fontSize: "xl",
      lineHeight: 1.6,
    },
    light: {
      fontWeight: "medium",
      fontSize: "xs",
      lineHeight: "shorter",
    },
    minibutton: {
      fontWeight: "bolder",
      fontSize: "10px",
      lineHeight: "1.2",
      letterSpacing: "0.18rem",
      textTransform: "uppercase",
    },
    normal: {
      fontSize: "md",
      lineHeight: "1",
    },
    medium: {
      fontWeight: "medium",
      fontSize: "sm",
      lineHeight: "1",
    },
    small: {
      fontWeight: "medium",
      fontSize: "xs",
      lineHeight: "shorter",
    },
  },
  sizes: {
    md: "1080px",
    lg: "1180px",
    xl: "1380px",
  },
});
