import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";

export default function CulturalPlacesScreen({ route,navigation }) {
  const { culturalDatas } = route.params;

  return (
    <View style={styles.view}>
      <FlatList
        numColumns={2}
        data={culturalDatas}
        keyExtractor={(item) => item.placeName}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() =>
              navigation.navigate("PlaceDetailsScreen", {
                places: culturalDatas,
                placeName: item.placeName,
              })
            }
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.placeImage }}
                style={styles.image}
                imageStyle={{ borderRadius: 15 }}
              />
              <Text style={styles.cardText}>{item.placeName}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
    marginRight: 10,
  },
  image: {
    width: 160,
    height: 150,
    borderRadius: 30,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    bottom: 0,
    padding: 20,
    color: "#fff",
  },
  pressed: {
    opacity: 0.75,
  },
  view: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});
