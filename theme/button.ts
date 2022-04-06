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
      fontWeight: "500",
      bg: "brand.purple",
      color: "white",
      px: "10",
      py: "2",
      _hover: {
        bg: "white",
        color: "brand.purple",
        _disabled: {
          bg: "brand.purple",
          color: "white",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    primarywhite: {
      outline: "none",
      borderRadius: "full",
      fontWeight: "500",
      bg: "white",
      color: "brand.purple",
      px: "10",
      py: "2",
      _hover: {
        bg: "brand.purple",
        color: "white",
        _disabled: {
          bg: "white",
          color: "brand.purple",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    votegreen: {
      outline: "none",
      borderRadius: "md",
      fontWeight: "500",
      bg: "green.500",
      color: "blackAlpha.900",
      px: "10",
      py: "2",
      _hover: {
        bg: "green.500",
        color: "blackAlpha.900",
        _disabled: {
          bg: "green.500",
          color: "blackAlpha.900",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    votered: {
      outline: "none",
      borderRadius: "md",
      fontWeight: "500",
      bg: "red.500",
      color: "blackAlpha.900",
      px: "10",
      py: "2",
      _hover: {
        bg: "red.500",
        color: "blackAlpha.900",
        _disabled: {
          bg: "red.500",
          color: "blackAlpha.900",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    voteinvalid: {
      outline: "none",
      borderRadius: "md",
      fontWeight: "500",
      bg: "whiteAlpha.400",
      color: "blackAlpha.900",
      px: "10",
      py: "2",
      _hover: {
        bg: "whiteAlpha.400",
        color: "blackAlpha.900",
        _disabled: {
          bg: "whiteAlpha.400",
          color: "blackAlpha.900",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    mini: {
      outline: "none",
      borderRadius: "md",
      color: "white.600",
      bg: "white.100",
      px: "2",
      h: "auto",
      py: "0.5",
      fontSize: "11px",
      border: "none",
      letterSpacing: "widest",
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
      borderRadius: "4px",
      minWidht: "16",
      py: "1.5",
      h: "7",
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
      bg: "#19254B",
      outline: "none",
      border: "solid 1px",
      w: "6",
      h: "6",
      px: "0",
      color: "white",
      _hover: {
        bg: "brand.purple",
      },
      _active: {
        color: "brand.purple",
        bg: "transparent",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    slider: {
      border: "0",
      alignItems: "flex-start",
      color: "white",
      opacity: "0.4",
      p: "0",
      minW: "0",
      _hover: {
        opacity: "0.6",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    silent: {
      outline: "none",
      borderRadius: "full",
      fontWeight: "400",
      bg: "white.200",
      borderWidth: "1px",
      borderColor: "white.300",
      color: "white",
      px: "10",
      py: "2",
      _focus: {
        boxShadow: "none",
      },
    },
    simple: {
      outline: "none",
      borderRadius: "none",
      bg: "none",
      p: "0",
      w: "auto",
      h: "auto",
      minW: "0",
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
