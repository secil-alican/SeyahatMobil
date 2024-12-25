import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ErrorValid from "./ErrorValid";

export default function AuthForm({ isLogin, onAuthanticating }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const emailValid = email.includes("@");
  const passwordValid = password.length >= 6;
  const userNameValid = userName.trim();

  const onAuthanticate = () => {
    // Giriş işlemi
    if (isLogin) {
      onAuthanticating(email, password); // Sadece e-posta ve şifreyi gönder
    } else {
      onAuthanticating(email, password); // Kayıt işlemi için de sadece e-posta ve şifreyi gönder
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>{isLogin ? "LOGIN" : "SIGN UP"}</Text>
      <View style={styles.login}>
        {!isLogin && (
          <View style={styles.userName}>
            <FontAwesome name="user" size={30} color="black" />
            <TextInput
              placeholder="User Name"
              placeholderTextColor="#FFF"
              style={[styles.inputText, { flex: 1 }]}
              value={userName}
              onChangeText={setUserName}
            />
          </View>
        )}
        <View style={styles.email}>
          <MaterialIcons name="email" size={30} color="black" />
          <TextInput
            placeholder="E-Mail"
            placeholderTextColor="#FFF"
            style={[styles.inputText, { flex: 1 }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email"
          />
        </View>
        <View>
          {!emailValid && email !== "" && <ErrorValid error="missing @" />}
        </View>

        <View style={styles.password}>
          <FontAwesome6 name="key" size={30} color="black" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry
            style={styles.inputText}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.eyeIcon}>
            <Pressable>
              <Ionicons name="eye-off" size={30} color="black" />
            </Pressable>
          </View>
        </View>
        <View>
          {!passwordValid && password !== "" && (
            <ErrorValid error="at least 6 characters" />
          )}
        </View>
      </View>

      <Pressable
        onPress={() => onAuthanticate(email, password)}
        style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}
      >
        <Text style={styles.loginText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </Pressable>

      <View style={styles.signUp}>
        <Text style={styles.signUpText}>
          {isLogin ? "Don't have an account?" : ""}
        </Text>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.signUpButton}>{isLogin ? "SignUp" : ""}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
    borderRadius: 30,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    width: "90%",
  },
  password: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
  },
  login: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 40,
  },
  loginButton: {
    borderRadius: 30,
    width: "60%",
    padding: 10,
    borderWidth: 3,
    borderColor: "white",
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontFamily: "monospace",
    fontSize: 16,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
  signUpButton: {
    color: "red",
    fontSize: 15,
    fontFamily: "monospace",
  },
  signUpText: {
    fontSize: 15,
    color: "white",
    fontFamily: "monospace",
  },
  inputText: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 18,
    flexDirection: "row",
    gap: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  email: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 15,
    borderRadius: 30,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    width: "90%",
  },
  eyeIcon: {
    marginLeft: 160,
  },
});
