import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  handlePlacesFavorites,
  handleActivityFavorites,
  handleFoodsFavorites,
} from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { db, auth } from "../firebase/firebaseConfig";
import { Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

export default function FavoritesScreen({ navigation }) {
  const [favoritePlacesList, setFavoritePlacesList] = useState([]);
  const [favoriteActivitiesList, setFavoriteActivitiesList] = useState([]);
  const [favoriteFoodsList, setFavoriteFoodsList] = useState([]);

  const { width } = Dimensions.get("window");

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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const favoritesRef = collection(
          db,
          "users",
          user.uid,
          "favoriteActivities"
        );
        const querySnapshot = await getDocs(favoritesRef);

        const favorites = [];
        querySnapshot.forEach((doc) => {
          favorites.push(doc.data());
        });

        setFavoriteActivitiesList(favorites);
      } catch (error) {
        console.error("Favori listesi alınırken hata:", error);
      }
    };

    fetchFavorites();
  }, [favoriteActivitiesList]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const favoritesRef = collection(db, "users", user.uid, "favoriteFoods");
        const querySnapshot = await getDocs(favoritesRef);

        const favorites = [];
        querySnapshot.forEach((doc) => {
          favorites.push(doc.data());
        });

        setFavoriteFoodsList(favorites);
      } catch (error) {
        console.error("Favori listesi alınırken hata:", error);
      }
    };

    fetchFavorites();
  }, [favoriteFoodsList]);

  const updatePlacesFavorite = async (place) => {
    await handlePlacesFavorites(place);

    const status = await getFavoriteStatus(place.placeName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [place.placeName]: { ...place, status },
    }));
  };

  const updateActivitiesFavorite = async (activity) => {
    await handleActivityFavorites(activity);

    const status = await getFavoriteStatus(activity.activityName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [activity.activityName]: { ...activity, status },
    }));
  };

  const updateFoodsFavorite = async (food) => {
    await handleFoodsFavorites(food);

    const status = await getFavoriteStatus(food.foodName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [food.foodName]: { ...food, status },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["rgba(216, 162, 94, 0.5)", "rgba(232, 203, 162, 0.5)"]}
        style={styles.gradient}
      >
        <View style={styles.titleView}>
          <Text style={styles.title}>FAVORİLER</Text>
        </View>

        {favoritePlacesList.length > 0 ? (
          <>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons name="place" size={25} color="#555" />
              <Text style={styles.categoryText}>Yerler</Text>
            </View>

            <FlatList
              data={favoritePlacesList}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={{ width, marginRight: 20 }}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.itemContainer,
                      pressed && styles.pressed,
                    ]}
                    onPress={() =>
                      navigation.navigate("PlaceDetailsScreen", {
                        places: favoritePlacesList,
                        placeName: item.placeName,
                        isFav: "red",
                      })
                    }
                  >
                    <Image
                      source={{ uri: item?.placeImage }}
                      style={styles.image}
                    />
                    <Text style={styles.itemName}>{item?.placeName}</Text>
                    <View style={styles.icons}>
                      <View style={styles.ratingView}>
                        <FontAwesome name="star" size={20} color="#EEDF7A" />
                        <Text>{item?.placeRatings}</Text>
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
                  </Pressable>
                </View>
              )}
            />
          </>
        ) : null}

        {favoriteActivitiesList.length > 0 ? (
          <>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Feather name="activity" size={25} color="#555" />
              <Text style={styles.categoryText}>Aktiviteler</Text>
            </View>

            <FlatList
              data={favoriteActivitiesList}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={{ width, marginRight: 20 }}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.itemContainer,
                      pressed && styles.pressed,
                    ]}
                    onPress={() =>
                      navigation.navigate("ActivityDetailsScreen", {
                        activities: favoriteActivitiesList,
                        activityName: item.activityName,
                        isFav: "red",
                      })
                    }
                  >
                    <Image
                      source={{ uri: item?.activityImage }}
                      style={styles.image}
                    />
                    <Text style={styles.itemName}>{item?.activityName}</Text>
                    <View style={styles.icons}>
                      <View style={styles.ratingView}>
                        <FontAwesome name="star" size={20} color="#EEDF7A" />
                        <Text>{item?.activityRatings}</Text>
                      </View>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() =>
                          updateActivitiesFavorite({
                            activityName: item.activityName,
                            activityImage: item.activityImage,
                          })
                        }
                      >
                        <MaterialIcons
                          name="favorite"
                          size={24}
                          color={
                            favoriteActivitiesList.some(
                              (fav) => fav.activityName === item.activityName
                            )
                              ? "red"
                              : "#ddd"
                          }
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          </>
        ) : null}

        {favoriteFoodsList.length > 0 ? (
          <>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons name="local-dining" size={25} color="#555" />
              <Text style={styles.categoryText}>Yerel Yemekler</Text>
            </View>

            <FlatList
              data={favoriteFoodsList}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={{ width, marginRight: 20 }}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.itemContainer,
                      pressed && styles.pressed,
                    ]}
                    onPress={() =>
                      navigation.navigate("FoodDetailsScreen", {
                        foods: favoriteFoodsList,
                        foodName: item.foodName,
                        isFav: "red",
                      })
                    }
                  >
                    <Image
                      source={{ uri: item?.foodImage }}
                      style={styles.image}
                    />
                    <Text style={styles.itemName}>{item?.foodName}</Text>
                    <View style={styles.icons}>
                      <View style={styles.ratingView}>
                        <FontAwesome name="star" size={20} color="#EEDF7A" />
                        <Text>{item?.restaurantRatings}</Text>
                      </View>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() =>
                          updateFoodsFavorite({
                            foodName: item.foodName,
                            foodImage: item.foodImage,
                          })
                        }
                      >
                        <MaterialIcons
                          name="favorite"
                          size={24}
                          color={
                            favoriteFoodsList.some(
                              (fav) => fav.foodName === item.foodName
                            )
                              ? "red"
                              : "#ddd"
                          }
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          </>
        ) : null}

        {favoritePlacesList.length === 0 &&
          favoriteActivitiesList.length === 0 &&
          favoriteFoodsList.length === 0 && (
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
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
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
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleView: {
    marginBottom: 30,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#D8A25E",
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  favoriteEmptyText: {
    fontWeight: "400",
    color: "black",
    fontSize: 18,
  },
  emptyFavorites: {
    alignItems: "center",
    marginVertical: 200,
  },
  categoryText: {
    fontSize: 20,
    color: "#555",
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
});
