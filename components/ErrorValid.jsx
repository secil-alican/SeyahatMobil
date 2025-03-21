import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const width = Dimensions.get("window").width;

export default function ErrorValid({ error }) {
  return (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#A04747",
  },
  errorView: {
    paddingHorizontal: 40,
    width: width,
    marginTop: -30,
  },
});
