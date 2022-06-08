import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get("window");

export default function FavoritePost({ data }) {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Detail", { id: data.id });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <ImageBackground
        source={{
          uri: `http://192.168.1.105:1337${data?.attributes?.cover?.data?.attributes?.url}`,
        }}
        style={styles.cover}
        resizeMode="cover"
        blurRadius={2}
        imageStyle={{ borderRadius: 6, opacity: 0.6 }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {data?.attributes?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#232630",
  },
  title: {
    color: "#e5e5e5",
    fontSize: 17,
    fontWeight: "bold",

    paddingVertical: 8,
    paddingHorizontal: 12,
    textShadowColor: "#121212",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
});
