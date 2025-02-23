import { Alert } from "react-native";
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../firebase/firebase";

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  const loginHandler = async (email, password) => {
    try {
      await loginUser(email, password);
      Alert.alert("Giriş Başarılı", "Başarıyla giriş yapıldı!");
      navigation.navigate("Index");
    } catch (error) {
      Alert.alert("Giriş Başarısız!", error.message || "Tekrar deneyiniz!");
    }
  };

  return <AuthForm isLogin={isLogin} onAuthanticating={loginHandler} />;
}
