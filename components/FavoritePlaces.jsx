import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { handlePlacesFavorites } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Dimensions } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function FavoritePlaces() {
  const [favoritePlacesList, setFavoritePlacesList] = useState([]);

  const navigation = useNavigation();

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

        const favorites = [];
        querySnapshot.forEach((doc) => {
          favorites.push(doc.data());
        });

        setFavoritePlacesList(favorites);
      } catch (error) {
        console.error("Favori listesi alınırken hata:", error);
      }
    };

    fetchFavorites();
  }, [favoritePlacesList]);

  const updatePlacesFavorite = async (place) => {
    await handlePlacesFavorites(place);

    const status = await getFavoriteStatus(place.placeName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [place.placeName]: { ...place, status },
    }));
  };

  return (
    <>
      <FlatList
        data={favoritePlacesList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() =>
              navigation.navigate("PlaceDetailsScreen", {
                places: favoritePlacesList,
                placeName: item.placeName,
                isFav: "red",
              })
            }
          >
            <View style={styles.itemContainer}>
              <Image source={{ uri: item?.placeImage }} style={styles.image} />
              <Text style={styles.itemName}>{item?.placeName}</Text>
              <View style={styles.icons}>
                <View style={styles.ratingView}>
                  <FontAwesome name="star" size={20} color="#EEDF7A" />
                  <Text style={{fontWeight:"bold"}}>{item?.placeRatings}</Text>
                </View>
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() =>
                    updatePlacesFavorite({
                      placeName: item.placeName,
                      placeImage: item.placeImage,
                    })
                  }
                >
                  <MaterialIcons
                    name="favorite"
                    size={24}
                    color={
                      favoritePlacesList.some(
                        (fav) => fav.placeName === item.placeName
                      )
                        ? "red"
                        : "#ddd"
                    }
                  />
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      />
      {favoritePlacesList.length === 0 && (
        <View style={styles.emptyFavorites}>
          <Image
            source={require("../assets/images/emptyFavorites.png")}
            style={{ width: 100, height: 200 }}
          />
          <Text style={styles.favoriteEmptyText}>
            Listelenecek Favori yok !
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    marginHorizontal: 20,
  },

  image: {
    height: 150,
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    width: screenWidth / 2 - 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 40,
    marginTop: 20,
  },
  itemName: {
    fontWeight: "600",
    marginVertical: 10,
  },
  ratingView: {
    flexDirection: "row",
    gap: 5,
    justifyContent:"center",
    alignItems:"center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  favoriteEmptyText: {
    fontWeight: "400",
    color: "black",
    fontSize: 18,
  },
  emptyFavorites: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
