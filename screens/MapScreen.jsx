import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";


export default function MapScreen({ route }) {
  return <Text>seçil</Text>;
}
/*import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

export default function MapScreen({ route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;

  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Kullanıcının mevcut konumunu al
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Rota oluşturmak için OpenRouteService API'sini kullan
  const getRoute = async () => {
    if (userLocation && destination) {
      const apiKey = "5b3ce3597851110001cf62488e952afcfa6e489a9369e47ada7e71bc";
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${userLocation.longitude},${userLocation.latitude}&end=${destination.longitude},${destination.latitude}`;

      try {
        const response = await axios.get(url);
        const route = response.data.routes[0].segments[0].steps.map((step) => ({
          latitude: step.end_location[1],
          longitude: step.end_location[0],
        }));
        setRouteCoordinates(route);
      } catch (error) {
        console.error("Error fetching route", error);
      }
    }
  };

  // Harita tıklanarak hedef belirleme
  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setDestination(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation && userLocation.latitude,
          longitude: userLocation && userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >

        {userLocation && (
          <Marker coordinate={userLocation} title="Your Location" />
        )}

        {destination && <Marker coordinate={destination} title="Destination" />}


        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="#1E90FF"
          />
        )}
      </MapView>


      <Button title="Get Route" onPress={getRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});

*/
