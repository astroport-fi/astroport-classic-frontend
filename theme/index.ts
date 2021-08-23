import { extendTheme } from "@chakra-ui/react";

import Modal from "./modal";
import Badge from "./badge";
import Tooltip from "./tooltip";
import Text from "./text";
import Button from "./button";
import Tabs from "./tabs";
import NumberInput from "./numberInput";
import Heading from "./heading";
import Menu from "./menu";
import Slider from "./slider";

export default extendTheme({
  fonts: {
    heading:
      "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    mono: "Menlo, monospace",
  },
  components: {
    Modal,
    Tooltip,
    Text,
    Badge,
    Button,
    Heading,
    NumberInput,
    Slider,
    Tabs,
    Menu,
  },
  colors: {
    green: { 500: "#23C7AA" },
    red: { 500: "#EE5467" },
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
      blue: "#1629E6",
      lightBlue: "rgba(131,179,253,0.3)",
    },
  },
});
