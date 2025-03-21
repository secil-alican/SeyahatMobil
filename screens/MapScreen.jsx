import { View, StyleSheet,Text } from "react-native";
import MapView, { Marker } from "react-native-maps";



export default function MapScreen({ route }) {
  const { latitude, longitude, placeName } = route.params;

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
        <Marker coordinate={{ latitude, longitude }} title={placeName} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
