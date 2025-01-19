import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIm0MwOuwCOOKvoD49Mircbh-IH0n2UTI",
  authDomain: "seyahatauth.firebaseapp.com",
  projectId: "seyahatauth",
  storageBucket: "seyahatauth.firebasestorage.app",
  messagingSenderId: "753023131051",
  appId: "1:753023131051:web:06ac3d53e92b4dd33406ee",
  measurementId: "G-YVGL17FED6",
};

// Firebase uygulamasını yalnızca bir kez başlatma
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Uygulama zaten başlatılmışsa mevcut olanı al
}

// Firebase Auth başlatma ve persistence ayarı
const auth = getAuth(app);

// Kullanıcı kayıt işlemi
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Hata kodu:", error.code);
    console.error("Hata mesajı:", error.message);
    throw error;
  }
};

// Kullanıcı giriş işlemi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Hata kodu:", error.code);
    console.error("Hata mesajı:", error.message);
    throw error;
  }
};


// Firestore'a kullanıcı bilgilerini kaydetme
export const saveProfile = async (name, email, phoneNumber, description) => {
  const user = auth.currentUser; // Giriş yapan kullanıcıyı al

  if (user) {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid); // Firestore'da user id'ye göre belge oluşturuyoruz
    await setDoc(userRef, {
      firstName: name.split(" ")[0],  // Adın ilk kısmını al
      lastName: name.split(" ")[1],   // Soyadının ikinci kısmını al
      email: email,
      phoneNumber: phoneNumber,
      description: description,
    });
  }
};

// Firestore'dan kullanıcı bilgilerini alma
export const getUserProfile = async () => {
  const user = auth.currentUser; // Giriş yapan kullanıcıyı al

  if (user) {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }
  return null;
};

export default { auth };
