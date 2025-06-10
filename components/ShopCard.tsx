// components/ShopCard.js
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    category: string;
    image: ImageSourcePropType;
  };
  onPress: () => void;
}
export default function ShopCard({ shop, onPress }: ShopCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={shop.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.category}>{shop.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    color: "#666",
  },
});
