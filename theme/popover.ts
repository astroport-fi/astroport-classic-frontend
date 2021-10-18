const styles = {
  baseStyle: {
    content: {
      border: "none",
      bg: "#C2D9FF",
      color: "brand.deepBlue",
      width: "full",
      p: 4,
      boxShadow: "xl",
      borderRadius: "2xl",
      _focus: {
        boxShadow: "none",
      },
    },
    header: {
      borderBottomWidth: 0,
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
