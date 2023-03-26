import { View, Text } from "react-native";
import React from "react";
import { Button } from "../../components/button";
import { removeIsUserLoggedIn } from "../../utils/help";

function Main({ navigation }) {
  const attemptToLogout = () => {
    removeIsUserLoggedIn();
    navigation.replace("Login");
  };
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <Text>main</Text>
      <View style={{ flexDirection: "row" }}>
        <Button primary title={"Log out"} onPress={attemptToLogout} />
      </View>
    </View>
  );
}

export { Main };
