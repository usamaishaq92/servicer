import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "./login_styles";
import { Button } from "../../components/button";

function Login({ navigation }) {
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
