import { Alert } from "react-native";
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../firebase/firebase";

export default function SignUpScreen({ navigation }) {
  const signUpHandler = async (email, password) => {
    try {
      await registerUser(email, password);
      Alert.alert("Kayıt Başarılı!");
      navigation.navigate("Index");
    } catch (error) {
      Alert.alert("Kayıt Başarısız!", error.message || "Tekrar deneyiniz!");
    }
  };

  return <AuthForm onAuthanticating={signUpHandler} />;
}
