import { useState } from "react";
import { Button, Image, View, StyleSheet, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComponent({ image, setImage }) {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Fotoğraf kütüphanesine erişim izni verilmedi!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require("../assets/images/camera.jpg")}
        style={styles.image}
      />

      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => pickImage()}
      >
        <Text style={styles.photoText}>Fotoğraf Ekle</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 40,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  pressed: {
    opacity: 0.5,
  },
  photoText: {
    marginVertical: 10,
    color: "#343131",
    marginLeft:30
  },
});
