import { auth, db } from "@/Context/firebaseConfig";
import MyButton from "@/components/MyButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Account created successfully!");

      router.navigate("/login");
    } catch (error: any) {
      console.error("Error creating account:", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Email already in use. Please try another email.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Error",
          "Invalid email format. Please enter a valid email."
        );
      } else if (error.code === "auth/weak-password") {
        Alert.alert(
          "Error",
          "Password is too weak. Please choose a stronger password."
        );
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.text}>Create an Account</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.inputText}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter email"
        style={styles.inputText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={{
            width: "90%",
          }}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
          size={24}
          color="#023e8a"
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm password"
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          style={{
            width: "90%",
          }}
        />
        <Ionicons
          name={showConfirmPassword ? "eye-off" : "eye"}
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          size={24}
          color="#023e8a"
        />
      </View>
      <MyButton title="Register" onPress={handleSignup} />
      <Link href="/login" style={{ color: "#023e8a", fontSize: 16 }}>
        Already have an account? Login
      </Link>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
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
