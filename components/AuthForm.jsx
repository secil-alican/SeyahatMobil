import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ErrorValid from "./ErrorValid";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useFonts } from "expo-font";
import {
  Srisakdi_400Regular,
  Srisakdi_700Bold,
} from "@expo-google-fonts/srisakdi";

export default function AuthForm({ isLogin, onAuthanticating }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const emailValid = email.includes("@");
  const passwordValid = password.length >= 6;
  const userNameValid = userName.trim();

  const onAuthanticate = () => {
    if (isLogin) {
      onAuthanticating(email, password);
      setEmail("");
      setPassword("");
    } else {
      onAuthanticating(email, password);
      setEmail("");
      setPassword("");
      setUserName("");
    }
  };

  let [fontsLoaded] = useFonts({
    Srisakdi_Regular: Srisakdi_400Regular,
    Srisakdi_Bold: Srisakdi_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.imageFontView}>
        <Image
          source={require("../assets/images/authScreen.png")}
          style={styles.image}
        />
        <Text style={styles.font}>JourneyNow</Text>
      </View>

      <View style={styles.secondLayer}>
        <View>
          <Text style={styles.title}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</Text>
        </View>
        <View style={styles.login}>
          {!isLogin && (
            <View style={styles.inputComponent}>
              <AntDesign name="user" size={24} color="black" />
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

        <View style={styles.signUpAndLogin}>
          <Text style={styles.signUpText}>
            {isLogin ? "Hesabın yok mu ?" : ""}
          </Text>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.signUpAndLoginButton}>
              {isLogin && "Kayıt Ol"}{" "}
            </Text>

            <View style={styles.signUpAndLogin}>
              <Text> {!isLogin && "Zaten hesabın var mı ?"}</Text>
              <Pressable
                onPress={() => navigation.navigate("LoginScreen")}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.signUpAndLoginButton}>
                  {!isLogin && "Giriş Yap"}{" "}
                </Text>
              </Pressable>
            </View>
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
    height: "65%",
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
  signUpAndLogin: {
    flexDirection: "row",
    gap: 10,
  },
  signUpAndLoginButton: {
    fontWeight: 600,
    fontSize: 15,
    textDecorationLine: "underline",
    color: "#A04747",
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
  existAcountView: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
  font: {
    color: "#ddd",
    fontFamily: "Srisakdi_Regular",
    fontSize: 40,
    textAlign: "center",
  },
  imageFontView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});
