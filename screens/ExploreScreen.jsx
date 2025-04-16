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
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

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
  const [culturelDatas, setCulturelDatas] = useState([]);

  const progress = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;

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
        const culturelData = await getCulturelPlaces();
        setCulturelDatas(culturelData);
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

      {historicalDatas.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Tarihi Yerler</Text>

          <FlatList
            horizontal
            data={historicalDatas}
            keyExtractor={(item) => item.placeName}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("PlaceDetailsScreen", {
                    places: images,
                    placeName: item.placeName,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.placeImage }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 15 }}
                  ></Image>
                  <Text style={styles.cardText}>{item.placeName}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}



      {culturelDatas.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Sanat Ve Müze</Text>

          <FlatList
            horizontal
            data={culturelDatas}
            keyExtractor={(item) => item.placeName}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("PlaceDetailsScreen", {
                    places: images,
                    placeName: item.placeName,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.placeImage }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 15 }}
                  ></Image>
                  <Text style={styles.cardText}>{item.placeName}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}

{natureDatas.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Doğa Ve Manzara</Text>

          <FlatList
            horizontal
            data={natureDatas}
            keyExtractor={(item) => item.placeName}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() =>
                  navigation.navigate("PlaceDetailsScreen", {
                    places: images,
                    placeName: item.placeName,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.placeImage }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 15 }}
                  ></Image>
                  <Text style={styles.cardText}>{item.placeName}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}

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
});
