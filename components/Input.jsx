import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function Input({ searchText, setSearchText }) {



  const navigation = useNavigation();

  function onFocusHandler() {
    navigation.navigate("SearchScreen");
  }


  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Nereye Gitmek İstiyorsun?"
        onFocus={onFocusHandler}
        value={searchText}
        onChangeText={(newValue) => setSearchText(newValue)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
});
