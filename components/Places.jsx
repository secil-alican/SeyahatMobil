import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  handlePlacesFavorites,
  getPlacesFavoriteStatus,
} from "../firebase/firebase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase/firebaseConfig";
import Lottie from "./Lottie";

export default function Places({ searchText, cityName }) {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    const placesHandler = async () => {
      try {
        const placesSnapshot = await getDocs(
          collection(db, "cities", cityName, "places")
        );
        const placesData = [];

        placesSnapshot.docs.forEach((placeDoc) => {
          const placeData = placeDoc.data();
          placesData.push({ id: placeDoc.id, ...placeData });
        });

        setPlaces(placesData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching places: ", error);
      }
    };

    if (cityName) {
      placesHandler();
    }
  }, [cityName]);

  const updateFavorite = async (place) => {
    await handlePlacesFavorites(place);

    const status = await getPlacesFavoriteStatus(place.placeName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [place.placeName]: { ...place, status },
    }));
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const favoritesRef = collection(
          db,
          "users",
          user.uid,
          "favoritePlaces"
        );
        const querySnapshot = await getDocs(favoritesRef);

        const favorites = {};
        querySnapshot.forEach((doc) => {
          favorites[doc.id] = doc.data();
        });

        setFavoriteStatus(favorites);
      } catch (error) {
        console.error("Favori listesi alınırken hata:", error);
      }
    };

    fetchFavorites();
  }, [favoriteStatus]);

  if (loading) {
    <Lottie />;
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.viewContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() =>
              navigation.navigate("PlaceDetailsScreen", {
                places: places,
                placeName: item.placeName,
              })
            }
          >
            <View style={styles.placesContainer}>
              <Image source={{ uri: item.placeImage }} style={styles.image} />
              <Text style={styles.placeName}>{item?.placeName}</Text>
              <View style={styles.icons}>
                <View style={styles.ratingView}>
                  <FontAwesome name="star" size={20} color="#EEDF7A" />
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item?.placeRatings}
                  </Text>
                </View>
                <View>
                  <Pressable
                    style={({ pressed }) => pressed && styles.pressed}
                    onPress={() =>
                      updateFavorite({
                        placeName: item.placeName,
                        placeImage: item.placeImage,
                        placeRatings: item.placeRatings,
                        placeDescription: item.placeDescription,
                        placeAdress: item.placeAdress,
                        placeMap: item.placeMap,
                        placeOpeningHours: item.placeOpeningHours,
                      })
                    }
                  >
                    <MaterialIcons
                      name={
                        favoriteStatus[item.placeName]
                          ? "favorite"
                          : "favorite-border"
                      }
                      size={24}
                      color={favoriteStatus[item.placeName] ? "red" : "black"}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
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
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  placesContainer: {
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
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
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
