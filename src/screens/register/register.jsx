import { useState } from "react";
import { TextInput, View, TouchableOpacity, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../services/firebaseConfig";
import { setDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    if (profilePic === "") {
      alert("profile picture is a must");
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

        // try uploading the image
        attemptToUploadData(user.uid);
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

  const attemptToUploadData = (uid) => {
    setLoading(true);
    // make the blob of the image
    uriToBlob(profilePic)
      .then((blobReponse) => {
        const timestamp = new Date().getTime();
        const filename = `${uid}_${timestamp}.jpg`;
        const fileRef = ref(storage, filename);
        uploadBytes(fileRef, blobReponse)
          .then((uploadResponse) => {
            getDownloadURL(fileRef)
              .then((fileResponse) => {
                console.log(fileResponse);
                // upload the image info and rest of the info to firesore

                const data = {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  profileImgUrl: fileResponse,
                };

                // setDoc ak doc bnao hmari firesotre db ma
                // users collection k andr new UID k sath data la k
                setDoc(doc(db, "users", uid), data)
                  .then((lastResponse) => {
                    alert("User successfuly Registered.");
                  })
                  .catch((lastError) => {
                    alert(lastError.message);
                  });
              })
              .catch((fileError) => {
                alert(fileError.message);
                setLoading(false);
              });
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
      <View style={Styles.bottomCon}></View>

      <Spinner visible={loading} textContent={"Loading..."} />

      {isCameraOpen === true && <CustomCamera onPictureTaken={onPicTaken} />}
    </View>
  );
}

export { Register };
