import "react-native-reanimated";
import { View, Text, StatusBar } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Index from "../screens/Index";
import React, { useState, useEffect } from "react";
import SearchScreen from "../screens/SearchScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import MapScreen from "../screens/MapScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import ActivityDetailsScreen from "../screens/ActivityDetailsScreen";
import { auth } from "../firebase/firebaseConfig";
import Lottie from "../components/Lottie";
import HistoricalPlacesScreen from "../screens/HistoricalPlacesScreen";
import CulturalPlacesScreen from "../screens/CulturalPlacesScreen";
import NaturePlacesScreen from "../screens/NaturePlacesScreen";
import OnboardScreen from "../screens/OnboardingScreen";
import ChatBotScreen from "../screens/ChatBotScreen";

const Stack = createNativeStackNavigator();

export default function RootLayout() {


  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    setTimeout(() => setLoading(false), 3000);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (loading) {
    return <Lottie />;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#1A1A1A",
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Index"
                component={Index}
                options={{ title: "AnaSayfa", headerShown: false }}
              />
              <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ title: "Ara" }}
              />
              <Stack.Screen
                name="PlaceDetailsScreen"
                component={PlaceDetailsScreen}
                options={{}}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ title: "Harita" }}
              />
              <Stack.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{
                  title: "Favoriler",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FoodDetailsScreen"
                component={FoodDetailsScreen}
                options={{
                  title: "Yerel Yemekler Detay",
                }}
              />
              <Stack.Screen
                name="ActivityDetailsScreen"
                component={ActivityDetailsScreen}
                options={{
                  title: "Aktivite Detay",
                }}
              />
              <Stack.Screen
                name="HistoricalPlacesScreen"
                component={HistoricalPlacesScreen}
                options={{
                  title: "Tarihi Yerler",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="CulturalPlacesScreen"
                component={CulturalPlacesScreen}
                options={{
                  title: "Sanat Ve Müze",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="NaturePlacesScreen"
                component={NaturePlacesScreen}
                options={{
                  title: "Doğa Ve Manzara",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="ChatBotScreen"
                component={ChatBotScreen}
                options={{
                  title: "Yapay Zeka Asistanı",
                  presentation: "modal",
                }}
              />
            </>
          ) : (
            <>
             <Stack.Screen
                name="OnboardScreen"
                component={OnboardScreen}
                options={{ title: "Giriş Yap", headerShown: false }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: "Giriş Yap", headerShown: false }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: "Kayıt Ol", headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
