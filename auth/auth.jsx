import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

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

export default { auth };
