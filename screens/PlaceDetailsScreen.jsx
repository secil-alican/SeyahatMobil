import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { cities } from "../dataset/CitiesData";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Weather from "../components/Weather";

export default function PlaceDetailsScreen({ route }) {
  const placeName = route.params.placeName;
  const [filtered, setFiltered] = useState([]);
  const [filterPlace, setFilterPlace] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: placeName });
  }, [placeName]);

  useEffect(() => {
    const filter = cities.filter((place) =>
      place.places.some((p) => p.placeName === placeName)
    );
    setFiltered(filter);

    const filterPlace = filter.flatMap((place) =>
      place.places.filter((p) => p.placeName === placeName)
    );
    setFilterPlace(filterPlace);
  }, [placeName]);

  return (
    <FlatList
      data={filterPlace}
      keyExtractor={(item) => item.placeName}
      renderItem={({ item }) => (
        <View style={styles.container}>
          {/* Resim Alanı */}
          <View style={styles.imageView}>
            <Image source={item.placeImage} style={styles.image} />
          </View>

          {/* İçerik Alanı */}
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
              <Ionicons name="alarm" size={24} color="#A04747" />
              <Text>{item.placeOpeningHours}</Text>
            </View>

            {/* PlaceMap'den Hava Durumu */}
            <FlatList
              data={item.placeMap}
              keyExtractor={(map) => map.placeName}
              renderItem={({ item: map }) => (
                <Weather latitude={map.latitude} longitude={map.longitude} />
              )}
            />

            {/* Konuma Git Butonu */}
            {item.placeMap?.map((map) => (
              <Pressable
                key={map.placeName} // her bir öğe için benzersiz bir key kullanın
                style={({ pressed }) => [
                  styles.goMapView,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    latitude: map.latitude,
                    longitude: map.longitude,
                  })
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
  },
  iconAndClock: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  contentView: {
    borderRadius: 40,
    marginTop: -50,
    padding: 20,
    backgroundColor: "#fff",
  },
  description: {
    marginTop: 20,
  },
  goMapView: {
    backgroundColor: "#343131",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
