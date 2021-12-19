const styles = {
  baseStyle: {
    content: {
      border: "none",
      bg: "#C2D9FF",
      color: "brand.deepBlue",
      width: "full",
      boxShadow: "xl",
      borderRadius: "2xl",
      _focus: {
        boxShadow: "none",
      },
      pb: 6,
    },
    header: {
      borderBottomWidth: 0,
      p: 6,
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
};

export default styles;
