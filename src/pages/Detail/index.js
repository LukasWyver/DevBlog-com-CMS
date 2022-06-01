import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Detail() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Tela Detail</Text>
      <Button
        title="Detalhes"
        onPress={() => {
          navigation.navigate("CategoryPosts");
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
