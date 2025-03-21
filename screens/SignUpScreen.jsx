import { Alert } from "react-native";
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../firebase/firebase";

export default function SignUpScreen({ navigation }) {
  const signUpHandler = async (email, password) => {
    try {
      const user = await registerUser(email, password);
      if (user) {
        Alert.alert("Kayıt Başarılı!");
        navigation.navigate("Index");
      }
    } catch (error) {
      Alert.alert("Kayıt Başarısız!", "Tekrar Deneyiniz!");
    }
  };

  return <AuthForm onAuthanticating={signUpHandler} />;
}
