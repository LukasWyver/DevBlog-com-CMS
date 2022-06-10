import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";
import PostItem from "../../components/PostItem";

export default function CategoryPosts() {
  const navigation = useNavigation();
  const route = useRoute();
  const [posts, setPosts] = useState([]);

  /* recebendo o titulo da categoria como parametro */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title === "" ? "Categoria" : route.params?.title,
    });
  }, [navigation]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get(
        `/api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`
      );
      setPosts(response.data?.data?.attributes?.posts?.data);
    }

    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Essa categoria ainda não possui nenhum post...
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.warningButton}
            activeOpacity={0.8}
          >
            <Text style={styles.warningButtonText}>Encontrar posts</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },
  warningContainer: {
    alignItems: "center",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  warningButton: {
    backgroundColor: "#162133",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    borderRadius: 4,
  },
  warningButtonText: {
    color: "#fff",
  },
});
