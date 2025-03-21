import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Lottie() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"#fff" }}>
      <LottieView
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        style={{ width: 500, height: 500 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
