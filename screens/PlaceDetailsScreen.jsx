import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Weather from "../components/Weather";
import { auth, db } from "../firebase/firebaseConfig";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getDocs, collection } from "firebase/firestore";
import * as Location from "expo-location";

export default function PlaceDetailsScreen({ route, navigation }) {
  const { placeName, places, isFav } = route.params;
  const [filterPlace, setFilterPlace] = useState([]);
  const [favoritePlacesList, setFavoritePlacesList] = useState([]);

  useEffect(() => {
    const placeDetails = places.filter(
      (place) => place.placeName === placeName
    );
    setFilterPlace(placeDetails);
  }, [placeName, places]);

  useEffect(() => {
    navigation.setOptions({ title: placeName });
  }, [placeName]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable>
          <MaterialIcons
             name={isFav ? "favorite" : "favorite-border"}
            size={30}
            color={isFav ? "red" : "black"}
          />
        </Pressable>
      ),
    });
  }, [favoritePlacesList]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getLocation();
  }, []);

  const openMap = (latitude, longitude, placeName) => {
    navigation.navigate("MapScreen", { latitude, longitude, placeName });
  };

  return (
    <FlatList
      data={filterPlace}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}

      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.placeImage }} style={styles.image} />
          </View>

          <View style={styles.contentView}>
            <View style={styles.titleAndRatings}>
              <Text style={styles.title}>{item.placeName}</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <FontAwesome name="star" size={25} color="#EEDF7A" />
                <Text style={styles.ratings}>{item.placeRatings}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
              <EvilIcons name="location" size={24} color="#A04747" />
              <Text>{item.placeAdress}</Text>
            </View>

            <Text style={styles.description}>{item.placeDescription}</Text>

            <View style={styles.iconAndClock}>
              <Ionicons name="alarm" size={25} color="#A04747" />
              <Text style={{ fontSize: 15 }}>{item?.placeOpeningHours}</Text>
            </View>

            <FlatList
              data={item.placeMap}
              keyExtractor={(map) => (map.id ? map.id.toString() : Math.random().toString())}

              renderItem={({ item: map }) => (
                <Weather latitude={map.latitude} longitude={map.longitude} />
              )}
            />

            {item.placeMap?.map((map) => (
              <Pressable
                key={map.placeName}
                style={({ pressed }) => [
                  styles.goMapView,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  openMap(map.latitude, map.longitude, item.placeName)
                }
              >
                <Text style={{ color: "#fff" }}>Konuma Git</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleAndRatings: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  ratings: {
    fontSize: 20,
    color:"#EEDF7A"
  },
  iconAndClock: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  contentView: {
    borderRadius: 40,
    marginTop: -50,
    padding: 20,
    backgroundColor: "#fff",
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  goMapView: {
    backgroundColor: "#343131",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 20,
  },
  pressed: {
    opacity: 0.5,
  },
});
