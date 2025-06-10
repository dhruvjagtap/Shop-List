import ShopCard from "@/components/ShopCard";
import { auth, db } from "@/Context/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

type RootStackParamList = {
  Home: undefined;
  shopdetail: { shopId: string; shopName: string };
};

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [shops, setShops] = useState<
    Array<{
      id: string;
      name: string;
      category: string;
      image: any; // ImageSourcePropType is better if available
    }>
  >([]);

  useEffect(() => {
    const fetchShops = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.warn("No authenticated user! Firestore will not allow read.");
        return;
      }
      try {
        const snapshot = await getDocs(collection(db, "shop"));
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            name: docData.name ?? "",
            category: docData.category ?? "",
            image: docData.image
              ? typeof docData.image === "string"
                ? { uri: docData.image }
                : docData.image
              : require("@/assets/images/profile.jpg"),
          };
        });
        setShops(data);
      } catch (error: any) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShopCard
            shop={item}
            onPress={() =>
              navigation.navigate("shopdetail", {
                shopId: item.id,
                shopName: item.name,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 16,
  },
});
