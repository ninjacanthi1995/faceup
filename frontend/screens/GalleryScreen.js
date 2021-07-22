import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, Badge } from "react-native-elements";
import { useSelector } from "react-redux";

export default function GalleryScreen() {
  const photos = useSelector((state) => state.photos);

  return (
    <ScrollView containerStyle={styles.container}>
      <Text h2 style={styles.title}>
        John's Galerry
      </Text>
      {photos.map((photo, i) => (
        <Card key={i} containerStyle={{ padding: 0, paddingBottom: 10 }}>
          <Card.Image
            source={{ uri: photo.url }}
            resizeMode="cover"
            style={styles.image}
          />
          <Badge value={photo.gender} status="success" />
          <Badge value={photo.age} status="success" />
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
    height: 600,
    marginBottom: 10,
  },
});
