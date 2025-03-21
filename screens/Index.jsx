import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/ExploreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AcountScreen from "./AccountScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native-web";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#D8A25E",
        tabBarActiveTintColor: "#343131",
        tabBarInactiveTintColor: "#ddd",


        tabBarStyle: {
          position: "absolute",
          borderRadius: 20,
          margin: 20,
          backgroundColor: "#343131",
          height: 60,
        },
        tabBarItemStyle: {
          height: 60,
          borderRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
          title: "Keşfet",
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
          title: "Favoriler",
        }}
      />
      <Tab.Screen
        name="AcountScreen"
        component={AcountScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          title: "Hesap",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
