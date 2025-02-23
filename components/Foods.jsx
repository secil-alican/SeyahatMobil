import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { handleFoodsFavorites, getFoodsFavoriteStatus } from "../firebase/firebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Foods({ cityName }) {
  const [foods, setFoods] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const foodsHandler = async () => {
      try {
        const foodsSnapshot = await getDocs(
          collection(db, "cities", cityName, "localFoods")
        );
        const foodsData = [];

        foodsSnapshot.docs.forEach((foodsDoc) => {
          const foodData = foodsDoc.data();
          foodsData.push(foodData);
        });
        setFoods(foodsData);
      } catch (error) {
        console.log("Error fetching foods: ", error);
      }
    };

    if (cityName) {
      foodsHandler();
    }
  }, [cityName]);

  const updateFavorite = async (food) => {
    await handleFoodsFavorites(food);

    const status = await getFoodsFavoriteStatus(food.foodName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [food.foodName]: { ...food, status },
    }));
  };



  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const favoritesRef = collection(db, "users", user.uid, "favoriteFoods");
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

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}

      renderItem={({ item }) => (
        <View style={styles.viewContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() =>
              navigation.navigate("FoodDetailsScreen", {
                foods: foods,
                foodName: item.foodName,
                isFav: favoriteStatus[item.foodName],
              })
            }
          >
            <View style={styles.foodsContainer}>
              <Image source={{ uri: item.foodImage }} style={styles.image} />
              <Text style={styles.foodName}>{item?.foodName}</Text>
              <View style={styles.icons}>
                <View style={styles.ratingView}>
                  <FontAwesome name="star" size={20} color="#EEDF7A" />
                  <Text>{item.restaurantRatings}</Text>
                </View>
                <View>
                  <Pressable
                    style={({ pressed }) => pressed && styles.pressed}
                    onPress={() =>
                      updateFavorite({
                        foodName: item.foodName,
                        foodImage: item.foodImage,
                        restaurantRatings: item.restaurantRatings,
                        foodDescription: item.foodDescription,
                        restaurantAdress: item.restaurantAdress,
                        restaurantMap: item.restaurantMap,
                        restaurantOpeningHours: item.restaurantOpeningHours,
                      })
                    }
                  >
                    <MaterialIcons
                        name= {favoriteStatus[item.foodName] ? "favorite" : "favorite-border"}
                      size={24}
                      color={favoriteStatus[item.foodName] ? "red" : "black"}
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
  foodsContainer: {
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

  foodName: {
    fontWeight: "600",
    marginVertical: 10,
  },
  pressed: {
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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
