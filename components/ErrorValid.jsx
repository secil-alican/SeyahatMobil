import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ErrorValid({ error }) {
  return (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#D8A25E",
    justifyContent: "flex-start",
  },
  errorView: {
    width: 320,
  },
});
