import { transparentize } from "@chakra-ui/theme-tools";

const baseStyle = {
  container: {
    py: "2",
    px: "4",
    borderRadius: "2xl",
    fontSize: "13px",
    border: "2px",
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
};

const variantSubtle = (props: any) => {
  const { theme, colorScheme: c } = props;

  if (c == "red") {
    return {
      container: {
        bg: transparentize("red.500", 0.3)(theme),
        borderColor: "#FF3F75",
        "* a": { color: "#FF3F75" },
      },
    };
  }

  if (c == "green") {
    return {
      container: {
        bg: transparentize("green.500", 0.3)(theme),
        borderColor: "#7FE6A2",
        "* a": { color: "#7FE6A2" },
      },
    };
  }

  return {
    container: {
      bg: transparentize("brand.lightPurple", 0.3)(theme),
      borderColor: "#909FBB",
      "* a": { color: "#22BAE1" },
    },
  };
};

const variants = {
  subtle: variantSubtle,
};

const style = {
  baseStyle,
  variants,
};

export default style;
