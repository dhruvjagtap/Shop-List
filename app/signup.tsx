import MyButton from "@/components/MyButton";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    router.navigate('/login')
  }

  

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.text}>Create an Account</Text>
      <TextInput placeholder="Enter name" style={styles.inputText} value={name} onChangeText={setName}/>
      <TextInput placeholder="Enter email" style={styles.inputText} value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Enter password"
        secureTextEntry
        style={styles.inputText}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder="Confirm password"
        secureTextEntry
        style={styles.inputText}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <MyButton title="Register" onPress={handleSignup} />
      <Link href="/login" style={{ color: '#023e8a', fontSize: 16 }}>
        Already have an account? Login
                </Link>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // IMPORTANT: allows scrolling when keyboard appears
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
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
});
