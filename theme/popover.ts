// import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
// import type {
//   PartsStyleFunction,
//   SystemStyleFunction,
//   SystemStyleObject,
// } from "@chakra-ui/theme-tools";
// import { cssVar, mode } from "@chakra-ui/theme-tools";

// const $popperBg = cssVar("popper-bg");

// const $arrowBg = cssVar("popper-arrow-bg");
// const $arrowShadowColor = cssVar("popper-arrow-shadow-color");

// const baseStylePopper: SystemStyleObject = {
//   zIndex: 10,
// };

// const baseStyleContent: SystemStyleFunction = (props) => {
//   const bg = mode("white", "gray.700")(props);
//   const shadowColor = mode("gray.200", "whiteAlpha.300")(props);

//   return {
//     [$popperBg.variable]: `colors.${bg}`,
//     bg: "brand.overlay",
//     [$arrowBg.variable]: $popperBg.reference,
//     [$arrowShadowColor.variable]: `colors.${shadowColor}`,
//     width: "xs",
//     border: "1px solid",
//     borderColor: "rgba(255, 255, 255, .1)",
//     borderRadius: "md",
//     boxShadow: "none",
//     zIndex: "inherit",
//     _focus: {
//       outline: 0,
//       boxShadow: "none",
//     },
//   };
// };

// const baseStyleHeader: SystemStyleObject = {
//   px: 0,
//   py: 0,
//   borderBottomWidth: "0",
//   color: "brand.deepBlue",
//   fontFamily: "WhyteInktrap",
//   fontSize: "20px",
// };

// const baseStyleBody: SystemStyleObject = {
//   px: 6,
//   pb: 6,
//   color: "brand.deepBlue",
//   fontSize: "12px",
//   lineHeight: 1.1,
//   fontWeight: "500",
// };

// const baseStyleFooter: SystemStyleObject = {
//   px: 6,
//   py: 4,
//   borderTopWidth: "0",
// };

// const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
//   popper: baseStylePopper,
//   content: baseStyleContent(props),
//   header: baseStyleHeader,
//   body: baseStyleBody,
//   footer: baseStyleFooter,
//   arrow: {},
// });

// export default {
//   parts: parts.keys,
//   baseStyle,
// };

const styles = {
  baseStyle: {
    content: {
      fontFamily: "WhyteInktrap",
      border: "none",
      bg: "#C2D9FF",
      color: "brand.deepBlue",
      width: "full",
      p: 6,
      boxShadow: "xl",
      borderRadius: "2xl",
      _focus: {
        boxShadow: "none",
      },
    },
    header: {
      borderBottomWidth: 0,
      fontSize: "xl",
      p: 0,
    },
    body: {
      p: 0,
    },
  },
  sizes: {
    xs: {
      popper: {
        maxWidth: "xs",
      },
    },
  },
  defaultProps: {
    flip: true,
  },
};

export default styles;
