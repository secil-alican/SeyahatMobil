import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import Testimonials from "../components/Testimonials";
import Input from "../components/Input";
import { db, auth } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import {
  getHistoricalPlaces,
  getCulturelPlaces,
  getNaturePlaces,
} from "../firebase/firebase";

const images = [
  require("../assets/images/imagesCard/1.jpg"),
  require("../assets/images/imagesCard/2.jpg"),
  require("../assets/images/imagesCard/3.jpg"),
  require("../assets/images/imagesCard/4.jpg"),
  require("../assets/images/imagesCard/5.jpg"),
  require("../assets/images/imagesCard/6.jpg"),
  require("../assets/images/imagesCard/7.jpg"),
  require("../assets/images/imagesCard/8.jpg"),
  require("../assets/images/imagesCard/9.jpg"),
  require("../assets/images/imagesCard/10.jpg"),
];

export default function ExploreScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [current, setCurrent] = useState(0);
  const [historicalDatas, setHistoricalDatas] = useState([]);
  const [natureDatas, setNatureDatas] = useState([]);
  const [culturalDatas, setCulturelDatas] = useState([]);

  useEffect(() => {
    const getName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const useRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(useRef);
          if (userSnap.exists()) {
            const name = userSnap.data().firstName;
            setFirstName(name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getName();
  }, [firstName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchExplorePlaces = async () => {
      try {
        const historicalData = await getHistoricalPlaces();
        setHistoricalDatas(historicalData);
        const natureData = await getNaturePlaces();
        setNatureDatas(natureData);
        const culturalData = await getCulturelPlaces();
        setCulturelDatas(culturalData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExplorePlaces();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Merhaba, {firstName} 👋</Text>
        <Text style={styles.subtitle}>Keşfetmeye hazır mısın?</Text>
        <Input />
      </View>
      <View style={styles.imageCardView}>
        <Image source={images[current]} style={styles.imagesCard} />
      </View>

      <View style={{ marginTop: 30 }}>
        {historicalDatas.length > 4 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionTitle}>Tarihi Yerler</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("HistoricalPlacesScreen", {
                    historicalDatas: historicalDatas,
                  })
                }
              >
                <Text style={styles.seeAllsText}>Tümünü Gör</Text>
              </Pressable>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={historicalDatas.slice(0, 4)}
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
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={historicalDatas}
            keyExtractor={(item) => item.placeName}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => {
                  navigation.navigate("PlaceDetailsScreen", {
                    places: historicalDatas,
                    placeName: item.placeName,
                  });
                }}
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
        )}
      </View>

      <View style={{ marginTop: 30 }}>
        {culturalDatas.length > 4 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionTitle}>Sanat Ve Müze</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("CulturalPlacesScreen", {
                    culturalDatas: culturalDatas,
                  })
                }
              >
                <Text style={styles.seeAllsText}>Tümünü Gör</Text>
              </Pressable>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={culturalDatas.slice(0, 4)}
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
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
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
        )}
      </View>

      <View style={{ marginTop: 30 }}>
        {natureDatas.length > 4 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionTitle}>Doğa Ve Manzara</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("NaturePlacesScreen", {
                    natureDatas: natureDatas,
                  })
                }
              >
                <Text style={styles.seeAllsText}>Tümünü Gör</Text>
              </Pressable>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={natureDatas.slice(0, 4)}
              keyExtractor={(item) => item.placeName}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() =>
                    navigation.navigate("PlaceDetailsScreen", {
                      places: natureDatas,
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
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Doğa Ve Manzara</Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={natureDatas}
              keyExtractor={(item) => item.placeName}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() =>
                    navigation.navigate("PlaceDetailsScreen", {
                      places: natureDatas,
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
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.testimonialsContainer}
      >
        <Testimonials
          testimonials="Seyahat, yalnızca bir yerden diğerine gitmek değil, aynı zamanda yaşamın ne kadar çeşitli olduğunu keşfetmektir."
          text=" – Mark Twain"
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  headerContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  testimonialsContainer: {
    marginVertical: 30,
  },

  sectionTitle: {
    fontSize: 25,
    fontWeight: "400",
    color: "#333",
    marginVertical: 20,
  },
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
  imageCardView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",

    padding: 10,
  },
  imagesCard: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  seeAllsText: {
    fontSize: 15,
    color: "#D8A25E",
  },
});
