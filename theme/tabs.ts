export default {
  baseStyle: {
    tabpanel: {
      padding: "0",
      paddingTop: "6",
    },
  },
  variants: {
    "soft-rounded": {
      tablist: {
        gap: "1rem",
      },
      tab: {
        borderRadius: "full",
        fontWeight: "500",
        color: "white",
        lineHeight: "1rem",
        fontSize: "sm",
        border: "1px solid #303348",
        _selected: {
          borderColor: "transparent",
          color: "brand.dark",
          bg: "brand.purple",
        },
        _focus: {
          boxShadow: "none",
          outline: "none",
        },
      },
    },
  },
};
