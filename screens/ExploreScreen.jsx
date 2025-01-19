import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Testimonials from "../components/Testimonials";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";

export default function ExploreScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.viewContainer}
    >
      <View style={styles.view}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Merhaba ,</Text>
          <Image
            source={require("../assets/images/user.jpg")}
            style={styles.userImage}
          />
        </View>

        <Input onFocus />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.textViewContainer}
        >
          <Testimonials
            testimonials="Seyahat, yalnızca bir yerden diğerine gitmek değil, aynı zamanda yaşamın ne kadar çeşitli olduğunu keşfetmektir. Yeni insanlarla tanışmak, farklı kültürlerle kaynaşmak ve onların gözlerinden dünyayı görmek, bizi daha derin bir anlayışa ulaştırır.
– Mark Twain"
          />
          <Testimonials
            testimonials="Her yolculuk, kendi içinde bir öğretmendir. Deneyimlediğiniz her şey, size yaşamın ne kadar basit ve aynı zamanda karmaşık olduğunu gösterir. Seyahat etmek, yalnızca manzaralarla değil, içsel bir dönüşümle de ilgilidir.
– Elizabeth Gilbert"
          />
          <Testimonials
            testimonials="Dünyayı bir kere görmek, bin kere duymaktan iyidir.
– Evliya Çelebi"
          />
          <Testimonials
            testimonials="Gezmek, sadece bir yerden diğerine gitmek değil; bir medeniyeti, bir tarihi, bir kültürü anlamaya çalışmaktır.
– Halil İnalcık"
          />
        </ScrollView>

        <View style={styles.imageContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Popüler Yerler
          </Text>
          <ScrollView
            style={styles.imageView}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View style={styles.imageContent}>
              <Image
                source={require("../assets/images/istanbul.jpg")}
                style={styles.image}
              />
              <View style={styles.textIcon}>
                <Text style={styles.imageText}>İstanbul</Text>
                <MaterialIcons
                  name="favorite-border"
                  size={24}
                  color="#D8A25E"
                />
              </View>
            </View>
            <View style={styles.imageContent}>
              <Image
                source={require("../assets/images/izmir.jpg")}
                style={styles.image}
              />
              <View style={styles.textIcon}>
                <Text style={styles.imageText}>İzmir</Text>
                <MaterialIcons
                  name="favorite-border"
                  size={24}
                  color="#D8A25E"
                />
              </View>
            </View>
            <View style={styles.imageContent}>
              <Image
                source={require("../assets/images/ankara.jpg")}
                style={styles.image}
              />
              <View style={styles.textIcon}>
                <Text style={styles.imageText}>Ankara</Text>
                <MaterialIcons
                  name="favorite-border"
                  size={24}
                  color="#D8A25E"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#eee",
  },

  titleView: {
    marginTop: 80,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view: {
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  textViewContainer: {
    flexDirection: "row",
    gap: 20,
  },
  imageContainer: {
    marginVertical: 50,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 20,
  },
  imageView: {
    marginVertical: 30,
    flexDirection: "row",
  },
  imageText: {
    textAlign: "left",
  },
  imageContent: {
    marginRight: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  textIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 250,
  },
});
