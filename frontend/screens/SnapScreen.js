import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Overlay } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";

import { useDispatch } from "react-redux";

export default function SnapScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [visible, setVisible] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode);

  const dimensions = useRef(Dimensions.get("window"));
  const screenWidth = dimensions.current.width;
  const height = Math.round((screenWidth * 16) / 9);

  let cameraRef = useRef(null);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={{ height: height, width: "100%" }}
          type={type}
          flashMode={flash}
          ratio="16:9"
          ref={(ref) => (cameraRef = ref)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setFlash(flash === "off" ? "torch" : "off");
              }}
            >
              <Icon name="flash" size={24} color="white" />
              <Text style={styles.text}>Flash</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.snapContainer}>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  toggleOverlay();
                  let photo = await cameraRef.takePictureAsync({
                    quality: 0.7,
                  });
                  let data = new FormData();
                  data.append("photo", {
                    uri: photo.uri,
                    type: "image/jpeg",
                    name: "random.jpg",
                  });

                  fetch("http://192.168.254.13:3000/upload", {
                    method: "POST",
                    body: data,
                  })
                    .then((response) => response.json())
                    .then((data) =>
                      dispatch({ type: "addPhotoUrl", url: data.result.url })
                    );

                  setVisible(false);
                }
              }}
              style={styles.snapButton}
            >
              <Icon name="save" size={24} color="white" />
              <Text style={{ color: "white", marginLeft: "5%", fontSize: 18 }}>
                Snap
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Loading ...</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 10,
  },
  button: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  snapContainer: {
    height: "7%",
    backgroundColor: "#169588",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
