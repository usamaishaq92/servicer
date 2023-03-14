import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { colors } from "../theme/designSystem";

/***
 *
 * primary : ( full bg  , with primary color, no border)
 * outline : ( no bg, border with primary, border 1 )
 */
function Button({ primary, outline, title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        primary === true
          ? styles.primaryButton
          : outline === true
          ? styles.outlineButton
          : styles.primaryButton
      }
    >
      <Text
        style={
          primary
            ? styles.btnText
            : outline
            ? styles.outlineText
            : styles.btnText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const base = {
  backgroundColor: colors.primary,
  borderRadius: 50,
  borderWidth: 1,
  padding: 14,
  alignItems: "center",
  marginVertical: 5,
  flex: 1,
};

const styles = StyleSheet.create({
  primaryButton: {
    ...base,
  },
  btnText: {
    color: colors.white,
  },
  outlineButton: {
    ...base,
    backgroundColor: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
});

export { Button };
