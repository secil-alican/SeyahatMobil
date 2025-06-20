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
import { auth, db } from "../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  isFavoriteFoods,
  handleFoodsFavorites,
} from "../firebase/firebase";

export default function FoodDetailsScreen({ route }) {
  const { foodName, foods, isFav } = route.params;
  const [filterfood, setFilterFood] = useState([]);
const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const foodDetails = foods.filter((food) => food.foodName === foodName);
    setFilterFood(foodDetails);
  }, [foodName, foods]);

  useEffect(() => {
    navigation.setOptions({ title: foodName });
  }, [foodName]);


 const updateFavorite = async (place) => {
     await handleFoodsFavorites(place);
     try {
       const favoriteData = await isFavoriteFoods(foodName);
       console.log("Favorite Data: ", favoriteData);
       setIsFavorite(favoriteData);
     } catch (error) {
       console.log("Error fetching favorite status: ", error);
     }

   };

   useEffect(() => {
     const checkFavoritestatus = async () => {
       try {
         const favoriteData = await isFavoriteFoods(foodName);
         console.log("Favorite Data: ", favoriteData);
         setIsFavorite(favoriteData);
       } catch (error) {
         console.log("Error fetching favorite status: ", error);
       }
     };
     checkFavoritestatus();
   }, [foodName]);


   useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => updateFavorite(filterfood[0])}
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
  }, [isFavorite, filterfood]);
  return (
    <FlatList
      data={filterfood}
      keyExtractor={(item) =>
        item.id ? item.id.toString() : Math.random().toString()
      }
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.foodImage }} style={styles.image} />
          </View>

          <View style={styles.contentView}>
            <View style={styles.titleAndRatings}>
              <Text style={styles.title}>{item.foodName?.trim()}</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <FontAwesome name="star" size={25} color="#EEDF7A" />
                <Text style={styles.ratings}>{item.restaurantRatings}</Text>
              </View>
            </View>

            <Text style={styles.description}>{item.foodDescription}</Text>

            <View style={styles.restaurantView}>
              <Text style={styles.restaurantText}>En iyi Restaurant :</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <EvilIcons name="location" size={25} color="#A04747" />
                <Text style={{color: "#555"}}>{item.restaurantAdress}</Text>
              </View>

              <View style={styles.iconAndClock}>
                <Ionicons name="alarm" size={24} color="#A04747" />
                <Text
                  style={{
                    fontSize: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#555",
                  }}
                >
                  {item?.restaurantOpeningHours}
                </Text>
              </View>
            </View>

            {item.restaurantMap?.map((map) => (
              <Pressable
                key={item.foodName}
                style={({ pressed }) => [
                  styles.goMapView,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    latitude: map.latitude,
                    longitude: map.longitude,
                    placeName: item.foodName,
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
    marginTop: -30,
    padding: 20,
    backgroundColor: "#fff",
    height: 480,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  restaurantText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#A04747",
  },
  restaurantView: {
    marginTop: 15,
    marginBottom: 20,
    gap: 10,
  },
});

