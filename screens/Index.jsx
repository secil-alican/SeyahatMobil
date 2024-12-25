import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <ImageBackground
          source={require("../assets/images/index.jpg")}
          style={styles.backImage}
        >
          <Text style={styles.imageText}>Where do you wanna go?</Text>
        </ImageBackground>
      </View>
      <View style={styles.startView}>
        <Text style={styles.startText}>Get Started</Text>
        <AntDesign
          name="arrowright"
          size={35}
          color="black"
          style={{ marginTop: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  backImage: {
    width: "100%",
    height: 700,
    opacity: 0.8,
    borderBottomRightRadius: 20,
    resizeMode: "contain",
    borderBottomRightRadius: 100,
    overflow: "hidden",
  },
  startView: {
    backgroundColor: "#F0BB78",
    marginHorizontal: 20,
    width: 180,
    borderRadius: 30,
    marginTop: 40,
    flexDirection: "row",
  },
  startText: {
    padding: 20,
    paddingHorizontal: 15,
    fontSize: 20,
    color: "white",
  },
  imageText: {
    fontSize: 80,
    color: "white",
    fontFamily: "monospace",
    marginTop: 250,
  },
});
