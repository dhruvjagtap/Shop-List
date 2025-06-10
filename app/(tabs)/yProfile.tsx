import { auth } from "@/Context/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [name, setName] = useState("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName || "Guest");
    }
  }, []);

  const logout = async () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
        navigation.replace("login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/profile.jpg")}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <Text style={styles.nameText}>{name}</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#023e84",
    fontSize: 18,
  },
});
