import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CategoryItem({ data, favorite }) {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Category", {
      id: data.id,
      title: data?.attributes?.name,
    });
  }

  function handleFavorite() {
    favorite();
    setChecked(!checked);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handleNavigate}
      onLongPress={handleFavorite}
    >
      <LinearGradient style={styles.content} colors={["#1f222b", "#383b44"]}>
        {checked && (
          <AntDesign
            style={styles.favorite}
            name="heart"
            size={12}
            color="#EF3054"
          />
        )}

        <Image
          style={styles.icon}
          source={{
            uri: `http://192.168.1.105:1337${data?.attributes?.icon?.data?.attributes?.url}`,
          }}
        />
        <Text style={styles.name}>{data?.attributes?.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginVertical: 8,
    width: 95,
    backgroundColor: "#383b44",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: 91,
    height: "96%",

    borderRadius: 8,
    paddingHorizontal: 14,
  },
  icon: {
    width: 40,
    height: 40,
  },
  favorite: {
    position: "absolute",
    top: 7,
    right: 7,
  },
  name: {
    color: "#e5e5e5",
  },
});
