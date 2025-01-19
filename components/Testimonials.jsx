import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function Testimonials({ testimonials }) {
  return (
    <View style={styles.textView}>
      <View>
        <Image
          source={require("../assets/images/quataiton.png")}
          style={styles.quatation}
        />
      </View>
      <View>
        <Text style={styles.text}>{testimonials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    borderBottomEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#F6C794",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 5,
    width: 350,
    marginRight: 10,
    position: "relative",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  quatation: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    zIndex: 1,
    position: "absolute",
    top: -40,
    right: -30,
  },
});
