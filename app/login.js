import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../constants";

const Login = () => {
  // State Initialization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle Login Function
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const userDetails = { email, password, token: "sample-token" };

    console.log('userDetails', userDetails);

    try {
      const detailsDatafromSignup = await AsyncStorage.getItem("userDetails");
      if (detailsDatafromSignup) {
        const parsedDetails = JSON.parse(detailsDatafromSignup);
        if (userDetails.email === parsedDetails.email && userDetails.password === parsedDetails.password) {
          router.push("/home");
        } else {
          Alert.alert("Error", "Incorrect email or password.");
        }
      } else {
        Alert.alert("Error", "No user details found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <></>,
          headerTitle: "",
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={{ padding: 20 }} testID="loginContainer">
          <View style={{ marginTop: 30 }} testID="formData">
            <View style={{ marginBottom: 10 }} testID="email">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>
            <View style={{ marginBottom: 20 }} testID="password">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={handleLogin}
              testID="handleLogin"
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              testID="textData"
            >
              <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={{ color: "blue" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
