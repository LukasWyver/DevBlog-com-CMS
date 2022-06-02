import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";
import { getFavorite, setFavorite } from "../../services/favorite";

import CategoryItem from "../../components/CategoryItem";
import FavoritePost from "../../components/FavoritePost";

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategories, setFavCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const category = await api.get("/api/categories?populate=icon");
      setCategories(category.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite();
      setFavCategories(response);
    }

    favorite();
  }, []);

  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavCategories(response);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>DevBlog</Text>

        <TouchableOpacity>
          <Feather
            name="search"
            size={24}
            color="#fff"
            onPress={() => navigation.navigate("Search")}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={styles.main}>
        {favCategories.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}
        <Text
          style={[
            styles.title,
            { marginTop: favCategories.length > 0 ? 14 : 46 },
          ]}
        >
          Conteúdos em alta
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232630",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  categories: {
    maxHeight: 115,

    backgroundColor: "#1f222b",
    marginHorizontal: 8,
    borderRadius: 8,

    zIndex: 9,
  },
  main: {
    flex: 1,
    marginTop: -30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    paddingHorizontal: 18,
    marginBottom: 14,
    marginTop: 8,
    color: "#162133",
  },
});
