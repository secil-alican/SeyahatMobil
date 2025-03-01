import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Weather({ latitude, longitude }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20e82ffda8c3e7303fd1dfc634a18c31&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  if (!weather) return <Text>Loading weather...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/weather.png")}
          style={styles.weatherImage}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.text}>Sıcaklık: </Text>
          <Text style={styles.value}>{weather.main?.temp}°C</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.text}>Durum: </Text>
          <Text style={styles.value}>
            {weather.weather?.[0]?.description || "Bilgi yok"}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.text}>Nem: </Text>
          <Text style={styles.value}>{weather.main?.humidity}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#577BC1",
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 40,

  },
  text: {
    color: "#fff",
    fontWeight: "350",
  },
  weatherImage: {
    width: 100,
    height: 40,
    marginVertical:10

  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical:20
  },
  value: {
    color: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D8A25E",


  },
});
