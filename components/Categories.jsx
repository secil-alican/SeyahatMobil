import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";


export default function Categories() {

  return (
    <View style={styles.categories}>
      <View style={styles.categoryItem}>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <View style={styles.categoryAndIcon}>
            <MaterialIcons name="place" size={24} color="black" />
            <Text>Yerler</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.categoryItem}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}

        >
          <View style={styles.categoryAndIcon}>
            <Feather name="activity" size={24} color="black" />
            <Text>Yapılacaklar</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.categoryItem}>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <View style={styles.categoryAndIcon}>
            <MaterialIcons name="local-dining" size={24} color="black" />
            <Text>Yerel Yemekler</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  pressed: {
    opacity: 0.5,
  },

  categoryItem: {
    backgroundColor: "#D8A25E",
    padding: 8,
    borderRadius: 10,
    marginVertical: 20,
  },
  categoryAndIcon: {
    flexDirection: "row",
  },
});
