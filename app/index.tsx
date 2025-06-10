import MyButton from "@/components/MyButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const onContinue = () => {
    router.navigate("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Shop List</Text>

      <MyButton title="Continue" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },

  text: {
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    color: "#023e8a",
    textAlign: "center",
  },
});
