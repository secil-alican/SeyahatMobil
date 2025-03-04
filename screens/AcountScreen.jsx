import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import { getUserProfile, saveProfile } from "../firebase/firebase";
import ImagePickerComponent from "../components/ImagePickerComponent";
import { auth } from "../firebase/firebaseConfig";

export default function AccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
          setPhoneNumber(data.phoneNumber);
          if (data.image) {
            setImage(data.image);
          }
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        console.log("Kullanıcı oturumu kapattı veya giriş yapmadı.");
      }
    });
  }, []);

  function saveHandler() {
    saveProfile(name, phoneNumber, image);
    Alert.alert("Başarılı", "Bilgiler kaydedildi!");
  }

  function logOut() {
    navigation.navigate("LoginScreen");
    Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yapıldı!");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.imageName}>
            <ImagePickerComponent image={image} setImage={setImage} />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.nameText}>{name} 👋</Text>
              <Text style={{ fontSize: 20 }}>Gezgin</Text>
            </View>
          </View>
          <LinearGradient
            colors={["#FAE1C0", "#F0C98D", "#D8A25E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientView}
          >
            <Text style={styles.inputText}>İsim Soyisim : </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="İsim Soyisim"
            />
            <Text style={styles.inputText}>E-Posta : </Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="E-posta"
              editable={false}
            />
            <Text style={styles.inputText}>Telefon Numarası : </Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={11}
              placeholder="Telefon Numarası"
            />

            <View style={styles.buttonContainer}>
              <Pressable style={styles.saveButton} onPress={saveHandler}>
                <Text style={styles.buttonText}>Kaydet</Text>
              </Pressable>
              <Pressable style={styles.logoutButton} onPress={logOut}>
                <Text style={styles.buttonText}>Çıkış Yap</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

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
    marginVertical: 35,
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
  imageName: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
  },

  gradientView: {
    padding: 10,
    borderRadius: 10,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
});
