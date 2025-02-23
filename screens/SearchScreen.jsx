import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useReducer } from "react";
import Input from "../components/Input";
import { isFavorite } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Activities from "../components/Activities";
import Foods from "../components/Foods";
import Places from "../components/Places";
import { db, auth } from "../firebase/firebaseConfig";

const reducer = (state, action) => {
  switch (action.type) {
    case "places":
      return { category: "places", cityName: action.payload.cityName };
    case "activities":
      return { category: "activities", cityName: action.payload.cityName };
    case "foods":
      return { category: "foods", cityName: action.payload.cityName };
    default:
      return state;
  }
};

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [favoriteStatuses, setFavoriteStatuses] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    category: null,
    cityName: null,
  });

  useEffect(() => {
    const getCities = async () => {
      try {
        if (searchText === "") {
          setFilteredCities([]);
          return;
        }

        const querySnapshot = await getDocs(collection(db, "cities"));
        const filtered = [];

        for (const cityDoc of querySnapshot.docs) {
          const cityData = cityDoc.data();

          if (
            cityData.cityName &&
            cityData.cityName.toLowerCase().includes(searchText.toLowerCase())
          ) {
            const placesSnapshot = await getDocs(
              collection(db, "cities", cityData.cityName, "places")
            );

            const places = [];

            placesSnapshot.docs.forEach((placeDoc) => {
              const placeData = placeDoc.data();
              places.push(placeData);
            });

            if (places.length > 0) {
              filtered.push({
                cityName: cityData.cityName,
                places: places,
              });
            }
          }
        }

        setFilteredCities(filtered);

        if (filtered.length > 0) {
          dispatch({
            type: "places",
            payload: { cityName: filtered[0].cityName },
          });
        }
      } catch (error) {
        console.error("Error fetching cities and places: ", error);
      }
    };

    getCities();
    setActiveCategory("places");
  }, [searchText]);

  useEffect(() => {
    const checkFavorites = async () => {
      const statuses = {};
      for (const city of filteredCities) {
        if (city.places) {
          for (const place of city.places) {
            const isFav = await isFavorite(place.placeName);
            statuses[place.placeName] = isFav;
          }
        }
      }
      setFavoriteStatuses(statuses);
    };

    checkFavorites();
  }, [filteredCities]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.viewContainer}>
        <Input searchText={searchText} setSearchText={setSearchText} />
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.cityName}
          renderItem={({ item }) => (
            <View>
              <View style={styles.categories}>
                <View
                  style={[
                    styles.categoryItem,
                    activeCategory === "places" && styles.activeCategory,
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "places",
                        payload: { cityName: item.cityName },
                      });
                      setActiveCategory("places");
                    }}
                  >
                    <View style={styles.categoryAndIcon}>
                      <MaterialIcons name="place" size={24} color="white" />
                      <Text style={{ color: "white" }}>Yerler</Text>
                    </View>
                  </Pressable>
                </View>

                <View
                  style={[
                    styles.categoryItem,
                    activeCategory === "activities" && styles.activeCategory,
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "activities",
                        payload: { cityName: item.cityName },
                      });
                      setActiveCategory("activities");
                    }}
                  >
                    <View style={styles.categoryAndIcon}>
                      <Feather name="activity" size={24} color="white" />
                      <Text style={{ color: "white" }}>Yapılacaklar</Text>
                    </View>
                  </Pressable>
                </View>

                <View
                  style={[
                    styles.categoryItem,
                    activeCategory === "foods" && styles.activeCategory,
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "foods",
                        payload: { cityName: item.cityName },
                      });
                      setActiveCategory("foods");
                    }}
                  >
                    <View style={styles.categoryAndIcon}>
                      <MaterialIcons
                        name="local-dining"
                        size={24}
                        color="white"
                      />
                      <Text style={{ color: "white" }}>Yerel Yemekler</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <Text style={styles.title}>{item.cityName}</Text>

              {state.category === "activities" && (
                <Activities cityName={state.cityName} />
              )}
              {state.category === "places" && (
                <Places cityName={state.cityName} searchText={searchText} />
              )}
              {state.category === "foods" && (
                <Foods cityName={state.cityName} />
              )}
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
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: "black",
  },

  categoryItem: {
    backgroundColor: "#D8A25E",
    padding: 8,
    borderRadius: 10,
    marginVertical: 20,
  },
  categoryAndIcon: {
    flexDirection: "row",
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  placesContainer: {
    marginVertical: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: 230,
  },

  placeName: {
    fontWeight: "600",
    marginVertical: 10,
  },
  pressedd: {
    opacity: 0.8,
  },
  ratingView: {
    flexDirection: "row",
    gap: 5,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeCategory: {
    backgroundColor: "#343131",
    transform: [{ scale: 1.1 }],
  },
});
