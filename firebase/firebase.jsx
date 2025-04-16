import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { cities } from "../dataset/CitiesData";
import { db, auth } from "./firebaseConfig";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const saveProfile = async (name, phoneNumber, image) => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
      phoneNumber,
      image,
    });
  }
};

export const getUserProfile = async () => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("Kullanıcı profili bulunamadı.");
      return null;
    }
  }
  return null;
};

export const addPlacesFavorites = async (favoriteRef, place) => {
  try {
    await setDoc(favoriteRef, {
      placeName: place.placeName,
      placeImage: place.placeImage,
      placeRatings: place.placeRatings,
      placeDescription: place.placeDescription,
      placeAdress: place.placeAdress,
      placeMap: place.placeMap,
      placeOpeningHours: place.placeOpeningHours,
      placeWeather: place.placeWeather,
    });

    console.log(`Favori "${place.placeName}" kaydedildi.`);
  } catch (err) {
    console.error("Favori ekleme hatası:", err);
  }
};

// Favori yeri silme
export const deletePlacesFavorites = async (favoriteRef) => {
  try {
    await deleteDoc(favoriteRef);

    console.log("Favori silindi.");
  } catch (err) {
    console.error("Favori silme hatası:", err);
  }
};

export const handlePlacesFavorites = async (place) => {
  const user = auth.currentUser;
  if (user) {
    try {
      // Doğru koleksiyon ve belge referansı
      const favoriteRef = doc(
        db,
        "users",
        user.uid,
        "favoritePlaces",
        place.placeName
      );

      const docSnapshot = await getDoc(favoriteRef);

      if (docSnapshot.exists()) {
        await deletePlacesFavorites(favoriteRef);
        console.log(`Favori "${place.placeName}" silindi.`);
      } else {
        await addPlacesFavorites(favoriteRef, place);
      }
    } catch (err) {
      console.error("Favori işlemlerinde hata:", err);
    }
  } else {
    console.error("Kullanıcı giriş yapmamış.");
  }
};

export const handleActivityFavorites = async (activity) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const favoriteRef = doc(
        db,
        "users",
        user.uid,
        "favoriteActivities",
        activity.activityName
      );
      const docSnapshot = await getDoc(favoriteRef);

      if (docSnapshot.exists()) {
        await deleteActivityFavorites(favoriteRef);

        console.log(`Favori "${activity.activityName}" silindi.`);
      } else {
        await addActivityFavorites(favoriteRef, activity);
      }
    } catch (err) {
      console.error("Favori işlemlerinde hata:", err);
    }
  } else {
    console.error("Kullanıcı giriş yapmamış.");
  }
};

export const addActivityFavorites = async (favoriteRef, activity) => {
  try {
    await setDoc(favoriteRef, {
      activityName: activity.activityName,
      activityImage: activity.activityImage,
      activityRatings: activity.activityRatings,
      activityDescription: activity.activityDescription,
      activityAdress: activity.activityAdress,
      activityMap: activity.activityMap,
      activityOpeningHours: activity.activityOpeningHours,
    });

    console.log(`Favori "${activity.activityName}" kaydedildi.`);
  } catch (err) {
    console.error("Favori ekleme hatası:", err);
  }
};

export const deleteActivityFavorites = async (favoriteRef) => {
  try {
    await deleteDoc(favoriteRef);

    console.log("Favori silindi.");
  } catch (err) {
    console.error("Favori silme hatası:", err);
  }
};

export const handleFoodsFavorites = async (food) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const favoriteRef = doc(
        db,
        "users",
        user.uid,
        "favoriteFoods",
        food.foodName
      );
      const docSnapshot = await getDoc(favoriteRef);

      if (docSnapshot.exists()) {
        await deleteFoodsFavorites(favoriteRef);

        console.log(`Favori "${food.foodName}" silindi.`);
      } else {
        await addFoodsFavorites(favoriteRef, food);
      }
    } catch (err) {
      console.error("Favori işlemlerinde hata:", err);
    }
  } else {
    console.error("Kullanıcı giriş yapmamış.");
  }
};

export const addFoodsFavorites = async (favoriteRef, food) => {
  try {
    await setDoc(favoriteRef, {
      foodName: food.foodName,
      foodImage: food.foodImage,
      restaurantRatings: food.restaurantRatings,
      foodDescription: food.foodDescription,
      restaurantAdress: food.restaurantAdress,
      restaurantMap: food.restaurantMap,
      restaurantOpeningHours: food.restaurantOpeningHours,
    });

    console.log(`Favori "${food.foodName}" kaydedildi.`);
  } catch (err) {
    console.error("Favori ekleme hatası:", err);
  }
};

export const deleteFoodsFavorites = async (favoriteRef) => {
  try {
    await deleteDoc(favoriteRef);

    console.log("Favori silindi.");
  } catch (err) {
    console.error("Favori silme hatası:", err);
  }
};

export const getPlacesFavoriteStatus = async (name) => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const favoriteRef = doc(db, "users", user.uid, "favoritePlaces", name);
    const docSnap = await getDoc(favoriteRef);

    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Favori durumu alınırken hata:", error);
    return false;
  }
};

export const getActivitiesFavoriteStatus = async (name) => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const favoriteRef = doc(db, "users", user.uid, "favoriteActivities", name);
    const docSnap = await getDoc(favoriteRef);

    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Favori durumu alınırken hata:", error);
    return false;
  }
};

export const getFoodsFavoriteStatus = async (name) => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const favoriteRef = doc(db, "users", user.uid, "favoriteFoods", name);
    const docSnap = await getDoc(favoriteRef);

    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Favori durumu alınırken hata:", error);
    return false;
  }
};

export const favoritesList = async (name) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Kullanıcı giriş yapmamış.");
    return false;
  }
  try {
    const favoriteRef = doc(db, "users", user.uid, "favorites", name);
    const docSnapshot = await getDoc(favoriteRef);
    if (docSnapshot.exists()) {
      return docSnapshot.exists();
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

export const saveCitiesToFirestore = async () => {
  try {
    if (!Array.isArray(cities) || cities.length === 0) {
      console.error("cities dizisi boş veya tanımlı değil.");
      return;
    }

    for (const city of cities) {
      const cityRef = doc(collection(db, "cities"), city.city);

      await setDoc(cityRef, { cityName: city.city }, { merge: true });

      for (const place of city.places) {
        const placeRef = doc(collection(cityRef, "places"), place.placeName);
        await setDoc(
          placeRef,
          {
            placeName: place.placeName,
            placeDescription: place.placeDescription,
            placeAdress: place.placeAdress,
            placeWeather: place.placeWeather,
            placeOpeningHours: place.placeOpeningHours,
            placeRatings: place.placeRatings,
            placeImage: place.placeImage,
            placeMap: place.placeMap,
          },
          { merge: true }
        );
      }

      for (const activity of city.activities) {
        const activityRef = doc(
          collection(cityRef, "activities"),
          activity.activityName
        );
        await setDoc(
          activityRef,
          {
            activityName: activity.activityName,
            activityDescription: activity.activityDescription,
            activityAdress: activity.activityAdress,
            activityOpeningHours: activity.activityOpeningHours,
            activityRatings: activity.activityRatings,
            activityImage: activity.activityImage,
            activityMap: activity.activityMap,
          },
          { merge: true }
        ); // Merge ile güncelle
      }

      // Yerel yiyecekleri ekle veya güncelle
      for (const food of city.localFoods) {
        const foodRef = doc(collection(cityRef, "localFoods"), food.foodName);
        await setDoc(
          foodRef,
          {
            foodName: food.foodName,
            foodDescription: food.foodDescription,
            restaurantRatings: food.restaurantRatings,
            restaurantOpeningHours: food.restaurantOpeningHours,
            restaurantAdress: food.restaurantAdress,
            foodImage: food.foodImage,
            restaurantMap: food.restaurantMap,
          },
          { merge: true }
        ); // Merge ile güncelle
      }
    }
    console.log("Tüm veriler başarıyla kaydedildi!");
  } catch (error) {
    console.error("Veri ekleme sırasında bir hata oluştu:", error);
  }
};

export const getHistoricalPlaces = async () => {
  try {
    const placesRef = collection(db, "cities", "İstanbul", "places");
    const q = query(placesRef, where("category", "==", "Tarihi"));
    const querySnapshot = await getDocs(q);

    const places = [];
    querySnapshot.forEach((doc) => {
      places.push(doc.data());
    });
    return places;
  } catch (error) {
    console.error("Veri alırken hata:", error);
    return [];
  }
};

export const getNaturePlaces = async () => {
  try {
    const placeRef = collection(db, "cities", "İstanbul", "places");
    const q = query(placeRef, where("category", "==", "Manzara"));
    const querySnapshot = await getDocs(q);
    const places = [];
    querySnapshot.forEach((doc) => {
      places.push(doc.data());
    });
    return places;
  } catch (error) {
    console.error("Veri alırken hata:", error);
    return [];
  }
};

export const getCulturelPlaces = async () => {
  try {
    const placeRef = collection(db, "cities", "İstanbul", "places");
    const q = query(placeRef, where("category", "==", "Sanat"));
    const querySnapshot = await getDocs(q);
    const places = [];
    querySnapshot.forEach((doc) => {
      places.push(doc.data());
    });
    return places;
  } catch (error) {
    console.error("Veri alırken hata:", error);
    return [];
  }
};
