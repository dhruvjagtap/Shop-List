import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface ProductCardProps {
  product: {
    id: string;
    productName: string;
    price: number;
    description: string;
    image: string | ImageSourcePropType;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={
          typeof product.image === "string"
            ? { uri: product.image }
            : product.image
        }
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.price}>
          {typeof product.price === "number" ? `₹${product.price}` : "No price"}
        </Text>

        <Text style={styles.description}>{product.description}</Text>
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
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    color: "#28a745",
    fontSize: 14,
    marginVertical: 4,
  },
  description: {
    color: "#666",
    fontSize: 12,
  },
});
