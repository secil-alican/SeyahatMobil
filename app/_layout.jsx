import "react-native-reanimated";
import { View, Text } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Index from "../screens/Index";
import React from "react";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Roboto" };
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1A1A1D" },
            headerTintColor: "#FFF",
            contentStyle: {
              fontFamily: "cursive",
              backgroundColor: "#DDD",
            },
            headerShown: false,
            statusBarHidden: true,
          }}
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Giriş Yap" }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ title: "Kayıt Ol" }}
          />
          <Stack.Screen
            name="Index"
            component={Index}
            options={{ title: "AnaSayfa" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
