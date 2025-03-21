import { Alert } from "react-native";
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../firebase/firebase";
import Lottie from "../components/Lottie"

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
const [loading, setLoading] = useState(false)
  const loginHandler = async (email, password) => {
    try {
      const userCredential = await loginUser(email, password);
      if (userCredential) {
        <Lottie/>
      } else {
        Alert.alert("Giriş Başarısız!", "Kullanıcı Bulunamadı!");
      }
    } catch (error) {
      Alert.alert("Giriş Başarısız!", "Bilgileri kontrol ediniz !");
    }
  };

  return <AuthForm isLogin={isLogin} onAuthanticating={loginHandler} />;
}
