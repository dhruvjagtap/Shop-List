import { auth } from "@/Context/firebaseConfig";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Listen to auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          router.replace("/(tabs)/Home"); // already logged in
        } else {
          router.replace("/"); // show welcome/index/login/signup
        }
      }, 2000); // match your animation
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity }]}>
        Shop List
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#023e8a",
  },
});
