import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "./login_styles";
import { Button } from "../../components/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import {
  getIsUserLoggedIn,
  saveIsUserLoggedIn,
  getUserUid,
  saveUserUid,
} from "../../utils/help";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const attemptToLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        const uid = user.uid;
        // save user session and user uid in local storage and move ahead
        saveIsUserLoggedIn();
        saveUserUid(uid);
        navigation.replace("Main");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.formCon}>
        <View style={Styles.form}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={Styles.inputCon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={Styles.inputCon}
          />

          <View style={{ flexDirection: "row" }}>
            <Button primary title={"Login"} onPress={attemptToLogin} />
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
