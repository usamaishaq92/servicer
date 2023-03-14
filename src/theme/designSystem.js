const colors = {
  primary: "#DB3022",
  secondary: "#EFC849",
  accent: "#2AA952",
  white: "white",
  black: "black",
};

const typography = {
  slicedThrough: {
    fontWeight: 100,
    textDecorationLine: "line-through",
    fontStyle: "italic",
    fontSize: 40,
  },
  heading400: {
    fontWeight: "bold",
    fontSize: 30,
    color: "blue",
  },
};

const genericStyles = {
  inputBase: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: 10,
  },
};

export { colors, typography, genericStyles };
