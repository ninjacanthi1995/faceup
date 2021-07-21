import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import { useSelector } from "react-redux";

// const users = [
//   {
//     img: require("../assets/picture-1.jpg"),
//     descriptions: ["homme", "70 ans", "barbe", "joyeux!", "cheveux gris"],
//   },
//   {
//     img: require("../assets/picture-2.jpg"),
//     descriptions: ["femme", "lunette", "31 ans", "joyeux!", "cheveux chatain"],
//   },
//   {
//     img: require("../assets/picture-3.jpg"),
//     descriptions: ["femme", "lunette", "31 ans", "joyeux!", "cheveux chatain"],
//   },
//   {
//     img: require("../assets/picture-4.jpg"),
//     descriptions: ["femme", "lunette", "31 ans", "joyeux!", "cheveux chatain"],
//   },
// ];

export default function GalleryScreen() {
  const photoUrls = useSelector(state => state.photoUrls);

  return (
    <ScrollView containerStyle={styles.container}>
      <Text h2 style={styles.title}>
        John's Galerry
      </Text>
      {photoUrls.map((url, i) => (
        <Card key={i} containerStyle={{ padding: 0, paddingBottom: 10 }}>
          <Card.Image
            source={{uri: url}}
            resizeMode="cover"
            style={styles.image}
          />
          {/* {user.descriptions.map((desc, j) => (
            <Badge key={j} value={desc} status="success" />
          ))} */}
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: "10%",
    textAlign: "center",
  },
  image: {
    height: 180,
    marginBottom: 10,
  },
});
