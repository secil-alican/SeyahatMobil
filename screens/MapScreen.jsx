import React from "react";
import { View, StyleSheet, Linking, Platform, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { latitude, longitude, placeName } = route.params;

  const openMap = () => {
    const latLng = `${latitude},${longitude}`;
    const label = encodeURIComponent(placeName);

    let url = "";

    if (Platform.OS === "ios") {
      url = `http://maps.apple.com/?ll=${latLng}&q=${label}`;
    } else {
      url = `geo:${latLng}?q=${latLng}(${label})`;
    }

    Linking.openURL(url).catch((err) => {
      console.error("Harita açılamadı:", err);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={placeName}
          onPress={openMap}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Haritada Aç" onPress={openMap} />
      </View>
    </View>
  );
}

// Buton için stil
const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
