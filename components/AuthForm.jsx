import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ErrorValid from "./ErrorValid";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

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
      setEmail("");
      setPassword("");
    } else {
      onAuthanticating(email, password); // Kayıt işlemi için de sadece e-posta ve şifreyi gönder
      setEmail("");
      setPassword("");
      setUserName("");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.appTitle}>{"Hello!"}</Text>
        <Text style={styles.appSubTitle}>{"Welcome to Seyahat Mobil"}</Text>
      </View>
      <View style={styles.secondLayer}>
        <View>
          <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        </View>
        <View style={styles.login}>
          {!isLogin && (
            <View style={styles.inputComponent}>
              <FontAwesome name="user" size={30} color="black" />
              <TextInput
                placeholder="User Name"
                style={styles.inputText}
                value={userName}
                onChangeText={setUserName}
              />
            </View>
          )}
          <View style={styles.inputComponent}>
            <Fontisto name="email" size={25} color="black" />
            <TextInput
              placeholder="E-mail"
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email"
            />
          </View>
          {!emailValid && email !== "" && (
            <View>
              <ErrorValid error="missing @" />
            </View>
          )}

          <View style={styles.inputComponent}>
            <AntDesign name="lock" size={25} color="black" />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.inputText}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {!passwordValid && password !== "" && (
            <View>
              <ErrorValid error="at least 6 characters" />
            </View>
          )}
        </View>

        <Pressable
          onPress={() => onAuthanticate(email, password)}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.pressed,
          ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#343131",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 30,
  },
  secondLayer: {
    alignSelf: "flex-end",
    backgroundColor: "#c3c3c3",
    width: "100%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: "70%",
    display: "flex",
    gap: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  login: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "90%",
  },
  inputComponent: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    backgroundColor: "#eee",
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    textAlign: "left",
    color: "#D8A25E",
    fontSize: 40,
    fontWeight: 700,
  },
  appTitle: {
    fontSize: 80,
    fontWeight: 600,
    color: "#ddd",
    paddingHorizontal: 10,
  },
  appSubTitle: {
    fontSize: 18,
    fontWeight: 400,
    color: "#ddd",
    paddingHorizontal: 10,
  },
  loginButton: {
    borderRadius: 30,
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#D8A25E",
    alignItems: "center",
    alignSelf: "center",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  signUpButton: {
    fontWeight: 600,
    fontSize: 15,
    textDecorationLine: "underline",
    color: "#D8A25E",
  },
  signUpText: {
    fontSize: 15,
    color: "#333",
  },
  inputText: {
    width: "100%",
    color: "#111",
    fontWeight: 600,
    fontSize: 18,
    gap: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
