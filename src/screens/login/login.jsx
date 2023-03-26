import { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "./login_styles";
import { Button } from "../../components/button";
import { getIsUserLoggedIn } from "../../utils/help";

function Login({ navigation }) {
  // on user sees this pagG

  useEffect(() => {
    getIsUserLoggedIn().then((response) => {
      if (response === "true") {
        navigation.replace("Main");
      }
    });
  }, []);

  const myFunc = () => {
    alert("asfas");
  };

  const myFunc2 = () => {
    alert("func 2");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.formCon}>
        <View style={Styles.form}>
          <TextInput placeholder="email" style={Styles.inputCon} />
          <TextInput placeholder="password" style={Styles.inputCon} />
          <View style={{ flexDirection: "row" }}>
            <Button primary title={"Signin"} onPress={myFunc} />
          </View>

          <TouchableOpacity onPress={goToRegister}>
            <Text>Dont have an account signup</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.bottomCon}></View>
    </View>
  );
}

export { Login };
