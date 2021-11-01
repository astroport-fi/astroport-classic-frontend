const button = {
  sizes: {
    md: {
      fontSize: "sm",
      lineHeight: "shorter",
    },
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
      px: "10",
      py: "2",
      _hover: {
        bg: "white",
        color: "brand.purple",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    mini: {
      outline: "none",
      borderRadius: "lg",
      color: "white.600",
      bg: "white.100",
      px: "4",
      minWidth: "32",
      fontSize: "xs",
      height: "7",
      letterSpacing: "0.15rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      _hover: {
        bg: "brand.purple",
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
      _active: {
        bg: "brand.purple",
        color: "white",
      },
    },
    filter: {
      outline: "none",
      color: "white.600",
      bg: "white.100",
      fontSize: "0.65rem",
      borderRadius: "sm",
      minWidht: "16",
      py: "1",
      px: "2.5",
      height: "auto",
      letterSpacing: "0.15rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      _hover: {
        bg: "brand.purple",
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
      _active: {
        bg: "brand.purple",
        color: "white",
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
    icon: {
      bg: "transparent",
      outline: "none",
      _hover: {
        color: "brand.purple",
        bg: "transparent",
      },
      _active: {
        color: "brand.purple",
        bg: "transparent",
      },
      _focus: {
        boxShadow: "none",
      },
      color: "transparent",
    },
    simple: {
      outline: "none",
      borderRadius: "none",
      bg: "none",
      px: "none",
      color: "white.400",
      fontWeight: "400",
      fontSize: "lg",
      _hover: {
        color: "white",
      },
      _active: {
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default button;
