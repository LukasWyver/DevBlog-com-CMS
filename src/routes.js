import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CategoryPosts from "./pages/CategoryPosts";
import Search from "./pages/Search";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detalhes",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#232630",
          },
        }}
      />
      <Stack.Screen
        name="CategoryPosts"
        component={CategoryPosts}
        options={{
          title: "Categorias",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#232630",
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Pesquisa",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#232630",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
