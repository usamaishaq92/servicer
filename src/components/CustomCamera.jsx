import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";

/// a full screen camera operna
// takes picture and gives its parent screen the picture data
// closes it self

function CustomCamera({}) {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  requestPermission();

  const onTakePicturePress = () => {
    // check if camera is working not fine then just dont do anything
    if (cameraRef.current === undefined) {
      return;
    }

    cameraRef.current
      .takePictureAsync()
      .then((response) => {
        console.log(response);
        // check if the path of picture exists then take it to the state
        if (response.uri !== undefined) {
          // setProfilePicUri(response.uri);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.con}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.cameraButtonView}>
          <TouchableOpacity onPress={onTakePicturePress}>
            <View style={styles.cameraButton} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraButtonView: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cameraButton: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: "white",
  },
  profilePicImg: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 50,
  },
});

export { CustomCamera };
