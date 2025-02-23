import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/ExploreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AcountScreen from "./AcountScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        statusBarHidden: true,
        tabBarActiveBackgroundColor: "#D8A25E",
        tabBarActiveTintColor: "#343131",
        tabBarInactiveTintColor: "#ddd",

        tabBarStyle: {
          position: "absolute",
          borderRadius: 20,
          marginVertical: 20,
          marginHorizontal: 20,
          backgroundColor: "#343131",
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          title: "Keşfet",
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />
          ),
          title: "Favoriler",
        }}
      />
      <Tab.Screen
        name="AcountScreen"
        component={AcountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),

          title: "Hesap",

        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
