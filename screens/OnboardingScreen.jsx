import { StyleSheet, Text, View,Dimensions } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  const handleDone = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#889E73",
            image: (
              <LottieView
                source={require("../assets/animations/placeLottie.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Yerleri Keşfet",
            subtitle:
              "Keşfetmek için yeni yerler mi arıyorsunuz? Şehirdeki en popüler ve gizli köşeleri keşfedin.",
          },
          {
            backgroundColor: "#fdeb93",
            image: (
              <LottieView
                source={require("../assets/animations/activityLottie.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Aktiviteleri Keşfet",
            subtitle:
              "Adrenalin dolu aktiviteler ya da sakin bir gün mü istersiniz? Uygulamamızda her zevke uygun etkinlikler sizi bekliyor",
          },
          {
            backgroundColor: "#C599B6",
            image: (
              <LottieView
                source={require("../assets/animations/foodLottie.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Yerel Yemekleri Keşfet",
            subtitle:
              "Yemek, bir şehri keşfetmenin en lezzetli yoludur. Yerel tatları deneyimleyin ve unutulmaz bir gastronomik yolculuğa çıkın.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
});
