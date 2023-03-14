import { View, Text } from "react-native";
import { colors, typography } from "../theme/designSystem";

function Landing() {
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.secondary, marginTop: 100 }}
    >
      <Text style={typography.heading400}>Hey</Text>
      <Text style={typography.heading400}>Hello</Text>
      <Text style={typography.slicedThrough}>Hi</Text>
    </View>
  );
}

export { Landing };
