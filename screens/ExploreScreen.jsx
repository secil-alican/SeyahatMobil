import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Testimonials from "../components/Testimonials";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Input from "../components/Input";
import { db, auth } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function ExploreScreen() {
  const [firstName, setFirstName] = useState("");

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
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Merhaba, {firstName} 👋</Text>
        <Text style={styles.subtitle}>Keşfetmeye hazır mısın?</Text>
        <Input onFocus />
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

        <Testimonials
          testimonials="Her yolculuk, kendi içinde bir öğretmendir. Deneyimlediğiniz her şey, size yaşamın ne kadar basit ve aynı zamanda karmaşık olduğunu gösterir."
          text="– Elizabeth Gilbert"
        />
        <Testimonials
          testimonials="Dünyayı bir kere görmek, bin kere duymaktan iyidir. "
          text="– Evliya Çelebi"
        />
      </ScrollView>

      <View style={styles.popularPlacesContainer}>
        <Text style={styles.sectionTitle}>Popüler Yerler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={require("../assets/images/istanbul.jpg")}
              style={styles.image}
            />
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>İstanbul</Text>
              <MaterialIcons name="favorite" size={24} color="red" />
            </View>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../assets/images/izmir.jpg")}
              style={styles.image}
            />
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>İzmir</Text>
              <MaterialIcons name="favorite" size={24} color="red" />
            </View>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../assets/images/ankara.jpg")}
              style={styles.image}
            />
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>Ankara</Text>
              <MaterialIcons name="favorite" size={24} color="red" />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 20,
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
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,

    marginRight: 15,
    padding: 10,
  },
  image: {
    width: 160,
    height: 200,
    borderRadius:15
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
