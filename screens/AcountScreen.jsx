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
import { saveProfile } from "../auth/auth";

export default function AcountScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(false);

  const navigation = useNavigation();

  // Kullanıcı bilgilerini Firestore'dan al
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
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserInfo();
  }, []);

  // Bilgileri kaydetme işlemi
  function saveHandler() {
    if (!isValidPhone) {
      Alert.alert("Geçersiz!", "Geçersiz Telefon Numarası");
    } else if (!validemail) {
      Alert.alert("Geçersiz!", "Geçersiz E-Posta");
    } else {
      saveProfile(name, email, phoneNumber, description);
      return Alert.alert("Başarılı", "Başarıyla Kaydedildi!");
    }
  }

  function logOut() {
    navigation.navigate("LoginScreen");
    return Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yapıldı!");
  }

  const validPhone = (number) => {
    const phoneRegex = /^0[5-9][0-9]{9}$/;
    setIsValidPhone(phoneRegex.test(number));
    setPhoneNumber(number);
  };

  const validemail = email.includes("@");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.view}
          contentContainerStyle={{ paddingBottom: 100 }} // Alttan boşluk ekler
        >
          <View style={styles.FirstLayer}>
            <Image
              source={require("../assets/images/user.jpg")}
              style={styles.userImage}
            />
          </View>
          <View style={styles.informations}>
            <View style={styles.secondLayer}>
              <Text style={styles.inputText}>İsim Soyisim :</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(newValue) => setName(newValue)}
              />

              <Text style={styles.inputText}>E-Posta :</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(newValue) => setEmail(newValue)}
              />
              <Text style={styles.inputText}>Telefon Numarası :</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={validPhone}
                maxLength={11}
              />

              <Text style={styles.inputText}>Açıklama :</Text>
              <TextInput
                placeholder="Kendinle İlgili Bir Açıklama Yap"
                style={styles.input}
                value={description}
                onChangeText={(newValue) => setDescription(newValue)}
                multiline
                maxLength={100}
              />
            </View>
            <View style={styles.saveButton}>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={saveHandler}
              >
                <Text style={{ textAlign: "center" }}>Kaydet</Text>
              </Pressable>
            </View>

            <View style={styles.logoutButton}>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={logOut}
              >
                <Text style={{ textAlign: "center" }}>Çıkış Yap</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  FirstLayer: {
    backgroundColor: "#343131",
    height: 300,
    alignItems: "center", // Resmi ortalar
    justifyContent: "flex-end", // Resmi altta hizalar
    paddingBottom: 20,
  },
  secondLayer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -70,
  },
  input: {
    marginVertical: 20,
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize: 15,
    paddingVertical: 15,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  logoutButton: {
    backgroundColor: "#D8A25E",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#118B50",
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  informations: {
    marginHorizontal: 30,
    marginTop: 20, // Absolute yerine margin ekledik
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 250,
    marginBottom: -40,
  },
  inputText: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
