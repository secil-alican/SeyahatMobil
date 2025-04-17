import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";

export default function HistoricalPlacesScreen({ route,navigation }) {
  const { historicalDatas } = route.params;


  return (
    <View style={styles.view}>
      <FlatList
        numColumns={2}
        data={historicalDatas}
        keyExtractor={(item) => item.placeName}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() =>
              navigation.navigate("PlaceDetailsScreen", {
                places: historicalDatas,
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
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
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
