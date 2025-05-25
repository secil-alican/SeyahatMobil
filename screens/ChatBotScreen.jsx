import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import { InferenceClient } from "@huggingface/inference";
import { HUGGINGFACE_API_TOKEN } from "../key/key";

export default function ChatBotScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];

    setMessages(newMessages);
    setInput("");

    try {
      const client = new InferenceClient(HUGGINGFACE_API_TOKEN);
      const chatCompletion = await client.chatCompletion({
        provider: "cerebras",
        model: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });

      const botReply =
        chatCompletion.choices[0].message.content || "Yanıt alınamadı.";
      setMessages([...newMessages, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("Hugging Face API hatası:", error.message);
      setMessages([
        ...newMessages,
        { from: "bot", text: "Bir hata oluştu. Daha sonra tekrar deneyin." },
      ]);
    }
  };

  return (
   
      <View style={{ flex: 1, padding: 20 }}>
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                alignSelf: message.from === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.from === "user" ? "#DCF8C6" : "#ECECEC",
                borderRadius: 10,
                marginVertical: 5,
                padding: 10,
                maxWidth: "80%",
              }}
            >
              <Text style={{ color: "#333" }}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 30,
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ne Sormak İstersiniz?"
            style={styles.input}
          ></TextInput>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              sendMessage();
            }}
          >
            <Feather name="send" size={30} color="black" />
          </Pressable>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    width: "90%",
  },
  pressed: {
    opacity: 0.5,
  },
});
