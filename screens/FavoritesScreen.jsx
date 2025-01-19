import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function FavoritesScreen() {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Favoriler</Text>
        <MaterialIcons name="favorite" size={40} color="#D8A25E" />
      </View>
      <View style={styles.favoritesView}>
        <Text>Herhangi bir favorin yok</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#eee",
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 50,
  },
  favoritesView: {
    backgroundColor: "#fff",

  },
});
