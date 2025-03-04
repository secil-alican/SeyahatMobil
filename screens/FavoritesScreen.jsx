import React, { useEffect, useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FavoritePlaces from "../components/FavoritePlaces";
import FavoriteActivities from "../components/FavoriteActivities";
import FavoriteFoods from "../components/FavoriteFoods";

const reducer = (state, action) => {
  switch (action.type) {
    case "places":
      return { category: "places" };
    case "activities":
      return {
        category: "activities",
      };
    case "foods":
      return { category: "foods" };
    default:
      return state;
  }
};

export default function FavoritesScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    category: null,
  });

  useEffect(() => {
    dispatch({ type: "places" });
  }, []);

  return (
    <>
      <View style={styles.titleView}>
        <Text style={styles.title}>FAVORİLER</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Pressable
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.filterButton,
            ]}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.filterView}>
              <Text style={styles.filterText}>Filtrele</Text>
              <AntDesign name="filter" size={24} color="#fff" />
            </View>
          </Pressable>

          {modalVisible && (
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Text style={styles.categoryText}>KATEGORİLER</Text>
                  <View style={styles.categoryView}>
                    <Pressable
                      style={({ pressed }) => [
                        pressed && styles.pressed,
                        styles.categoryItem,
                      ]}
                      onPress={() => {
                        dispatch({ type: "places" });
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.categoryItemText}>Yerler</Text>
                    </Pressable>

                    <Pressable
                      style={({ pressed }) => [
                        pressed && styles.pressed,
                        styles.categoryItem,
                      ]}
                      onPress={() => {
                        dispatch({ type: "activities" });
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.categoryItemText}>Yapılacaklar</Text>
                    </Pressable>

                    <Pressable
                      style={({ pressed }) => [
                        pressed && styles.pressed,
                        styles.categoryItem,
                      ]}
                      onPress={() => {
                        dispatch({ type: "foods" });
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.categoryItemText}>
                        Yerel Yemekler
                      </Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.closeButton,
                    ]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Kapat</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          )}

          <View style={styles.categoryTitle}>
            <Text style={styles.categoryTitleText}>
              {state.category === "places" && "Yerler"}
              {state.category === "activities" && "Yapılacaklar"}
              {state.category === "foods" && "Yerel Yemekler"}
              {!(
                state.category === "places" ||
                state.category === "activities" ||
                state.category === "foods"
              ) && ""}
            </Text>
          </View>
        </ScrollView>
        {state.category === "places" && <FavoritePlaces />}
        {state.category === "activities" && <FavoriteActivities />}
        {state.category === "foods" && <FavoriteFoods />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 20,
  },

  pressed: {
    opacity: 0.5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 40,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
},

  filterView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: "#A04747",
    justifyContent: "space-between",
    backgroundColor: "#A04747",
  },

  filterButton: {
    backgroundColor: "#A04747",
    borderRadius: 25,
    marginBottom: 30,
  },

  filterText: {
    fontSize: 18,
    color: "#fff",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 320,
    elevation: 5,
  },

  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,

  },

  categoryView: {
    gap: 20,
    marginVertical: 20,
  },

  categoryItem: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: "#ccc",
    alignItems: "center",
    elevation: 2,
  },

  categoryItemText: {
    fontSize: 16,
    color: "#333",
  },

  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#D8A25E",
    borderRadius: 10,
  },

  closeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },

  categoryTitle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  categoryTitleText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
