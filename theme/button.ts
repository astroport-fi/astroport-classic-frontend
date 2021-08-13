const button = {
  sizes: {
    lg: {
      fontSize: "sm",
    },
  },
  variants: {
    primary: {
      outline: "none",
      borderRadius: "full",
      fontWeight: "400",
      bg: "brand.purple",
      color: "white",
      px: "6",
      _hover: {
        bg: "white",
        color: "brand.purple",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    secondary: {
      outline: "none",
      borderRadius: "none",
      bg: "#202232",
      color: "white",
      px: "6",
      _hover: {
        bg: "white",
        color: "brand.dark",
      },
      _active: {
        bg: "white",
        color: "brand.dark",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default button;
