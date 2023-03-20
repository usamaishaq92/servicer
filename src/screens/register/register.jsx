import { useState } from "react";
import { TextInput, View, TouchableOpacity, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../services/firebaseConfig";
import { setDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import { Styles } from "./register_styles";
import { Button } from "../../components/button";
import { CustomCamera } from "../../components/CustomCamera";
import { uriToBlob } from "../../utils/help";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");

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

    // if the form fully filled then please go to firebase
    //  for auth and show loader to the user and hide it when auth is done
    // sending data

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((authResponse) => {
        const user = authResponse.user;

        // print authResponse to study and get UID out of it
        console.log(user.uid);

        setDoc(doc(db, "users", user.uid), { email, firstName, lastName })
          .then((dbResponse) => {
            setLoading(false);
            alert("user is registerd");
          })
          .catch((dbError) => {
            setLoading(false);
            alert(dbError.message);
          });
      })
      .catch((authError) => {
        setLoading(false);
        alert(authError.message);
      });
  };

  const onPickImagePress = () => {
    // invert the state of camera opernet
    setIsCameraOpen(true);
  };
  const onPicTaken = (picturePath) => {
    setIsCameraOpen(false);
    setProfilePic(picturePath);
  };

  const onUploadPress = () => {
    setLoading(true);
    // make the blob of the image
    uriToBlob(profilePic)
      .then((blobReponse) => {
        const filename = `profilePic.jpg`;
        const fileRef = ref(storage, filename);
        uploadBytes(fileRef, blobReponse)
          .then((uploadResponse) => {
            alert("uploaded");
            setLoading(false);
          })
          .catch((uploadError) => {
            alert(uploadError.message);
            setLoading(false);
          });
      })
      .catch((blobError) => {
        alert(blobError.message);
        setLoading(false);
      });
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
            onChangeText={setFirstName}
            placeholder="first Name"
            style={Styles.inputCon}
          />
          <TextInput
            onChangeText={setLastName}
            placeholder="last Name"
            style={Styles.inputCon}
          />
          <TextInput
            onChangeText={setEmail}
            placeholder="email"
            style={Styles.inputCon}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="password"
            style={Styles.inputCon}
          />
          <TextInput
            onChangeText={setConfirmPassword}
            placeholder="confirm Passowrd"
            style={Styles.inputCon}
          />
          <View style={{ flexDirection: "row" }}>
            <Button primary title={"Register"} onPress={onSubmit} />
          </View>
        </View>
      </View>
      <View style={Styles.bottomCon}>
        <View style={{ flexDirection: "row" }}>
          <Button primary title={"upload image"} onPress={onUploadPress} />
        </View>
      </View>

      <Spinner visible={loading} textContent={"Loading..."} />

      {isCameraOpen === true && <CustomCamera onPictureTaken={onPicTaken} />}
    </View>
  );
}

export { Register };
