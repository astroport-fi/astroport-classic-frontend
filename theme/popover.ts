const styles = {
  baseStyle: {
    content: {
      fontFamily: "WhyteInktrap",
      border: "none",
      bg: "#C2D9FF",
      color: "brand.deepBlue",
      width: "full",
      py: [5, 6],
      px: 6,
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
    popper: {
      zIndex: 9998,
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
