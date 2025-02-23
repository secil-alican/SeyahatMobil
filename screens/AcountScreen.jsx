import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { saveProfile } from "../firebase/firebase";
import ImagePickerComponent from "../components/ImagePickerComponent";

export default function AccountScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(`${data.firstName} ${data.lastName}`);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          setDescription(data.description);
          if (data.image) {
            setImage(data.image);
          }
        }
      }
    };

    fetchUserInfo();
  }, []);

  function saveHandler() {
    if (!email.includes("@")) {
      Alert.alert("Geçersiz!", "Geçersiz E-Posta");
    } else {
      saveProfile(name, email, phoneNumber, description, image);
      Alert.alert("Başarılı", "Bilgiler kaydedildi!");
    }
  }

  function logOut() {
    navigation.navigate("LoginScreen");
    Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yapıldı!");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <LinearGradient
            colors={["rgba(216, 162, 94, 0.5)", "rgba(232, 203, 162, 0.5)"]}
            style={styles.gradient}
          >
            <ImagePickerComponent image={image} setImage={setImage} />

            <View style={styles.infoContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="İsim Soyisim"
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-posta"
              />

              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={11}
                placeholder="Telefon Numarası"
              />

              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={100}
                placeholder="Açıklama"
              />

              <View style={styles.buttonContainer}>
                <Pressable style={styles.saveButton} onPress={saveHandler}>
                  <Text style={styles.buttonText}>Kaydet</Text>
                </Pressable>
                <Pressable style={styles.logoutButton} onPress={logOut}>
                  <Text style={styles.buttonText}>Çıkış Yap</Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  gradient: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
