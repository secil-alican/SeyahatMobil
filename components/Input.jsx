import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Input({
  searchText,
  setSearchText,
  autoFocus = false,
}) {
  const navigation = useNavigation();

  function onFocusHandler() {
    navigation.navigate("SearchScreen");
  }

  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Hangi Şehre Gitmek İstiyorsun ?"
        onPress={onFocusHandler}
        value={searchText}
        onChangeText={(newValue) => setSearchText(newValue)}
        placeholderTextColor={"grey"}
        autoFocus={autoFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#9AA6B2",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});
