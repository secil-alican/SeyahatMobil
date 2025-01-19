import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Input from "../components/Input";
import { cities } from "../dataset/CitiesData";
import { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    const filtered = cities.filter(
      (city) =>
        city.city &&
        searchText &&
        city.city.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.viewContainer}>
        <Input searchText={searchText} setSearchText={setSearchText} />
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.city}
          renderItem={({ item }) => (
            <View>
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
                  <Pressable style={({ pressed }) => pressed && styles.pressed}>
                    <View style={styles.categoryAndIcon}>
                      <Feather name="activity" size={24} color="black" />
                      <Text>Yapılacaklar</Text>
                    </View>
                  </Pressable>
                </View>

                <View style={styles.categoryItem}>
                  <Pressable style={({ pressed }) => pressed && styles.pressed}>
                    <View style={styles.categoryAndIcon}>
                      <MaterialIcons
                        name="local-dining"
                        size={24}
                        color="black"
                      />
                      <Text>Yerel Yemekler</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <Text style={styles.title}>{item.city}</Text>
              <FlatList
                data={item.places || []}
                keyExtractor={(place) => place.placeName}
                renderItem={({ item: place }) => (
                  <Pressable
                    style={({ pressed }) => pressed && styles.pressedd}
                    onPress={() =>
                      navigation.navigate("PlaceDetailsScreen", {
                        placeName: place.placeName,
                        placeImage: place.placeImage,
                      })

                    }
                  >
                    <View style={styles.placesContainer}>
                      <Image source={place?.placeImage} style={styles.image} />
                      <View style={styles.placeNameAndIcon}>
                        <Text style={styles.placeName}>{place?.placeName}</Text>
                        <View style={styles.ratingView}>
                        <FontAwesome name="star" size={20} color="#EEDF7A" />
                        <Text>{place.placeRatings}</Text>
                        </View>

                        <MaterialIcons
                          style={styles.icon}
                          name="favorite-border"
                          size={24}
                          color="#D8A25E"
                        />
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 20,
    resizeMode: "cover",
  },
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  placesContainer: {
    flexDirection: "row",
    marginVertical: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    justifyContent: "space-around",
  },
  placeNameAndIcon: {
    justifyContent: "space-between",
  },

  icon: {
    alignSelf: "flex-end",
  },
  placeName: {
    fontWeight: "600",
  },
  pressedd: {
    opacity: 0.8,
  },
  ratingView:{
    flexDirection:"row",
    gap:5
  }
});
