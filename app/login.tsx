import MyButton from "@/components/MyButton";
import { auth } from "@/Context/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.log("Error : ", error);
      Alert.alert("Login failed ", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.text}>Welcome to Login Page</Text>
      <TextInput
        placeholder="Enter email"
        keyboardType="email-address"
        value={email}
        style={styles.inputText}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{
            width: "90%",
          }}
        />
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          onPress={() => setShowPassword(!showPassword)}
          size={24}
          style={styles.eyeIcon}
          color={"#023e84"}
        />
      </View>
      <MyButton title="Login" onPress={onLogin} />
      <Link href="/signup" style={{ color: "#023e8a", fontSize: 16 }}>
        Don't have an account? Sign Up
      </Link>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#023e8a",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  text: {
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    color: "#023e8a",
    textAlign: "center",
  },

  inputText: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#023e8a",
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
