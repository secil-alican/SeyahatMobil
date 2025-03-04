import React, { useEffect, useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import {
  handlePlacesFavorites,
  handleActivityFavorites,
  handleFoodsFavorites,
  favoritesList,
} from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { db, auth } from "../firebase/firebaseConfig";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function FavoriteActivities() {
  const [favoriteActivitiesList, setFavoriteActivitiesList] = useState([]);

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

  const updateActivitiesFavorite = async (activity) => {
    await handleActivityFavorites(activity);

    const status = await getFavoriteStatus(activity.activityName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [activity.activityName]: { ...activity, status },
    }));
  };

  return (
    <>
      <FlatList
        data={favoriteActivitiesList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() =>
              navigation.navigate("ActivityDetailsScreen", {
                activities: favoriteActivitiesList,
                activityName: item.activityName,
                isFav: "red",
              })
            }
          >
            <View style={styles.itemContainer}>
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
            </View>
          </Pressable>
        )}
      />
      {favoriteActivitiesList.length === 0 && (
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
