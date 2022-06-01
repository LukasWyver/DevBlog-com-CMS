import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoryPosts() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Tela Category Posts</Text>
      <Button
        title="Detalhes"
        onPress={() => {
          navigation.navigate("Search");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
