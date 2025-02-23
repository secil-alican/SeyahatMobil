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
import React from "react";
import SearchScreen from "../screens/SearchScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapScreen from "../screens/MapScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import ActivityDetailsScreen from "../screens/ActivityDetailsScreen";


const Stack = createNativeStackNavigator();

export default function RootLayout() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Roboto" };

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#1A1A1A",
            contentStyle: { fontFamily: "cursive" },
          }}
        >
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
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
