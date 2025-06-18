import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getActivitiesFavoriteStatus,
  handleActivityFavorites,
} from "../firebase/firebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getDocs, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase/firebaseConfig";

export default function Activities({ cityName }) {
  const [activities, setActivities] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const activityHandler = async () => {
      try {
        const activitiesSnapshot = await getDocs(
          collection(db, "cities", cityName, "activities")
        );
        const activitiesData = [];

        activitiesSnapshot.docs.forEach((activityDoc) => {
          const activityData = activityDoc.data();
          activitiesData.push({ id: activityDoc.id, ...activityData });
        });

        setActivities(activitiesData);
      } catch (error) {
        console.log("Error fetching activities: ", error);
      }
    };

    if (cityName) {
      activityHandler();
    }
  }, [cityName]);

  const updateFavorite = async (activity) => {
    await handleActivityFavorites(activity);

    const status = await getActivitiesFavoriteStatus(activity.activityName);
    setFavoriteStatus((prev) => ({
      ...prev,
      [activity.activityName]: { ...activity, status },
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
          "favoriteActivities"
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

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.viewContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() =>
              navigation.navigate("ActivityDetailsScreen", {
                activities: activities,
                activityName: item.activityName,
              })
            }
          >
            <View style={styles.activitiesContainer}>
              <Image
                source={{ uri: item.activityImage }}
                style={styles.image}
              />
              <Text style={styles.activityName}>{item?.activityName}</Text>
              <View style={styles.icons}>
                <View style={styles.ratingView}>
                  <FontAwesome name="star" size={20} color="#EEDF7A" />
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.activityRatings}
                  </Text>
                </View>
                <View>
                  <Pressable
                    style={({ pressed }) => pressed && styles.pressed}
                    onPress={() =>
                      updateFavorite({
                        activityName: item.activityName,
                        activityImage: item.activityImage,
                        activityRatings: item.activityRatings,
                        activityDescription: item.activityDescription,
                        activityAdress: item.activityAdress,
                        activityMap: item.activityMap,
                        activityOpeningHours: item.activityOpeningHours,
                      })
                    }
                  >
                    <MaterialIcons
                      name={
                        favoriteStatus[item.activityName]
                          ? "favorite"
                          : "favorite-border"
                      }
                      size={24}
                      color={
                        favoriteStatus[item.activityName] ? "red" : "black"
                      }
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
  activitiesContainer: {
    marginVertical: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  activityName: {
    fontWeight: "600",
    marginVertical: 10,
  },
  pressed: {
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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
