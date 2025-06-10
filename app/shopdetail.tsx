import ProductCard from "@/components/ProductCard";
import { db } from "@/Context/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

type RouteParams = {
  shopId: string;
  shopName: string;
};

type Product = {
  id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
};

export default function ShopDetail() {
  const route = useRoute();
  const { shopId, shopName } = route.params as RouteParams;

  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchShop = async () => {
      const docRef = doc(db, "shop", shopId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShop(docSnap.data());
      }
    };

    const fetchProducts = async () => {
      const productsRef = collection(db, "shop", shopId, "products");
      const snapshot = await getDocs(productsRef);
      const productsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          productName: data.productName ?? data.prodcutName ?? "",
          price: data.price,
          description: data.description,
          image: data.image,
        };
      }) as Product[];
      setProducts(productsData);
    };

    fetchShop();
    fetchProducts();
  }, [shopId]);

  if (!shop) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading shop details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.shopInfo}>
        <Image
          source={
            typeof shop.image === "string" ? { uri: shop.image } : shop.image
          }
          style={styles.shopImage}
        />
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.category}>{shop.category}</Text>
        <Text style={styles.address}>{shop.address}</Text>
      </View>

      <Text style={styles.productsHeader}>Products</Text>

      {products.length === 0 ? (
        <Text style={styles.noProducts}>No products available.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shopInfo: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#023e84",
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  productsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023e84",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  noProducts: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  productsList: {
    paddingBottom: 20,
  },
});
