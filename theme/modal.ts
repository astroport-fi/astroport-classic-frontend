const styles = {
  baseStyle: {
    overlay: {
      backdropFilter: "blur(12px)",
    },
    dialog: {
      borderRadius: "2xl",
      bg: "#C2D9FF",
      p: "6",
      color: "brand.deepBlue",
      boxShadow: "2xl",
    },
    header: {
      flex: 1,
      px: "0",
    },
    closeButton: {
      position: "static",
      color: "brand.deepBlue",
      p: "3",
      borderWidth: "1px",
      borderColor: "#000D37",
      borderRadius: "full",
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default styles;
