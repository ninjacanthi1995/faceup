import React from "react";
import { View, StyleSheet, Button, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Input
          placeholder="Enter your name"
          leftIcon={<Icon name="user" size={24} color="#169588" />}
          containerStyle={{ width: "80%" }}
        />
        <Button
          title="Go to Gallery"
          onPress={() => props.navigation.navigate("BottomNav")}
          color="#169588"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
