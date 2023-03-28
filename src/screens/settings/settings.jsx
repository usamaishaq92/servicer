import { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "../../services/firebaseConfig";

import { Styles } from "./settings_styles";
import { Button } from "../../components/button";
import { CustomCamera } from "../../components/CustomCamera";
import {
  removeIsUserLoggedIn,
  saveIsUserLoggedIn,
  getUserUid,
  uriToBlob,
} from "../../utils/help";

function Settings({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    // check if the user session is running

    getUserUid().then((response) => {
      const uid = response;
      const docRef = doc(db, "users", uid);
      getDoc(docRef)
        .then((response) => {
          if (response.exists()) {
            console.log(response.data());
            const user = response.data();
            setUserState(user);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    // doc(db, "users", "");
  }, []);

  // its called when useEffect brings user details from firestore
  const setUserState = (user) => {
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setProfilePic(user.profileImgUrl);
  };

  const onSubmit = () => {
    if (firstName === "") {
      alert("please enter name");
      return;
    }

    if (lastName === "") {
      alert("please enter last name");
      return;
    }

    if (email === "") {
      alert("please enter email");
      return;
    }

    if (password === "") {
      alert("please enter password");
      return;
    }

    if (confirmPassword === "") {
      alert("please enter confirm password");
      return;
    }

    if (confirmPassword !== password) {
      alert("passwords dont match");
      return;
    }

    if (profilePic === "") {
      alert("profile picture is a must");
      return;
    }

    // if the form fully filled then please go to firebase
    //  for auth and show loader to the user and hide it when auth is done
    // sending data
  };

  const onPickImagePress = () => {
    // invert the state of camera opernet
    setIsCameraOpen(true);
  };

  const onPicTaken = (picturePath) => {
    setIsCameraOpen(false);
    setProfilePic(picturePath);
  };

  const attemptToLogout = () => {
    removeIsUserLoggedIn();
    navigation.replace("Login");
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.formCon}>
        <TouchableOpacity
          style={Styles.pickImageCon}
          onPress={onPickImagePress}
        >
          <Image
            style={Styles.profieImage}
            source={
              profilePic === ""
                ? require("../../../assets/icon.png")
                : { uri: profilePic }
            }
          />
        </TouchableOpacity>

        <View style={Styles.form}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="first Name"
            style={Styles.inputCon}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="last Name"
            style={Styles.inputCon}
          />
          <TextInput
            onChangeText={setEmail}
            placeholder="email"
            value={email}
            style={Styles.inputCon}
          />
          <View style={{ flexDirection: "row" }}>
            <Button primary title={"Update Settings"} onPress={onSubmit} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button primary title={"Logout"} onPress={attemptToLogout} />
          </View>
        </View>
      </View>
      <View style={Styles.bottomCon}></View>

      <Spinner visible={loading} textContent={"Loading..."} />

      {isCameraOpen === true && <CustomCamera onPictureTaken={onPicTaken} />}
    </View>
  );
}

export { Settings };
