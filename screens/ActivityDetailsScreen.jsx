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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Weather from "../components/Weather";
import { auth, db } from "../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  isFavoriteActivity,
  handleActivityFavorites,
} from "../firebase/firebase";

export default function ActivityDetailsScreen({ route }) {
  const { activities, activityName } = route.params;
  const [filterActivity, setFilterActivity] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const activityDetails = activities.filter(
      (activity) => activity.activityName === activityName
    );
    setFilterActivity(activityDetails);
  }, [activityName, activities]);

  useEffect(() => {
    navigation.setOptions({ title: activityName });
  }, [activityName]);

  const updateFavorite = async (place) => {
     await handleActivityFavorites(place);
     try {
       const favoriteData = await isFavoriteActivity(activityName);
       console.log("Favorite Data: ", favoriteData);
       setIsFavorite(favoriteData);
     } catch (error) {
       console.log("Error fetching favorite status: ", error);
     }

   };

   useEffect(() => {
     const checkFavoritestatus = async () => {
       try {
         const favoriteData = await isFavoriteActivity(activityName);
         console.log("Favorite Data: ", favoriteData);
         setIsFavorite(favoriteData);
       } catch (error) {
         console.log("Error fetching favorite status: ", error);
       }
     };
     checkFavoritestatus();
   }, [activityName]);


   useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => updateFavorite(filterActivity[0])}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={25}
            color={isFavorite ? "red" : "#000"}
          />
        </Pressable>
      ),
    });
  }, [isFavorite, filterActivity]);

  return (
    <FlatList
      data={filterActivity}
      keyExtractor={(item) =>
        item.id ? item.id.toString() : Math.random().toString()
      }
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.activityImage }} style={styles.image} />
          </View>

          <View style={styles.contentView}>
            <View style={styles.titleAndRatings}>
              <Text style={styles.title}>{item.activityName}</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <FontAwesome name="star" size={25} color="#EEDF7A" />
                <Text style={styles.ratings}>{item.activityRatings}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
              <EvilIcons name="location" size={24} color="#A04747" />
              <Text style={{ color: "#555" }}>{item.activityAdress}</Text>
            </View>

            <Text style={styles.description}>{item.activityDescription}</Text>

            <View style={styles.text2}>
              <Text style={{ fontWeight: "500" }}>Eğlenceye hazır mısın?</Text>
            </View>

            <View style={styles.iconAndClock}>
              <Ionicons name="alarm" size={24} color="#A04747" />
              <Text style={{ fontSize: 15, color: "#555" }}>
                {item.activityOpeningHours}
              </Text>
            </View>

            <FlatList
              data={item.activityMap}
              keyExtractor={(map) =>
                map.id ? map.id.toString() : Math.random().toString()
              }
              renderItem={({ item: map }) => (
                <Weather latitude={map.latitude} longitude={map.longitude} />
              )}
            />

            <Pressable
              style={styles.goMapView}
              onPress={() =>
                navigation.navigate("MapScreen", {
                  latitude: item.activityMap[0]?.latitude,
                  longitude: item.activityMap[0]?.longitude,
                  placeName: item.activityName,
                })
              }
            >
              <Text style={{ color: "#fff" }}>Konuma Git</Text>
            </Pressable>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  titleAndRatings: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratings: {
    fontSize: 20,
    color: "#EEDF7A",
  },
  iconAndClock: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
  pressed: {
    opacity: 0.5,
  },
  goMapView: {
    backgroundColor: "#343131",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 20,
  },
  text2: {
    marginVertical: 20,
  },
});
