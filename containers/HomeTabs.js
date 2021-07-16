import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

//import icons tab navigator
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Navigation
const Tab = createBottomTabNavigator();

//import containers
import HomeScreen from "../containers/HomeScreen";
import FavoritesScreen from "../containers/FavoritesScreen";
import SettingScreen from "../containers/SettingScreen";

//import colors
import colors from "../assets/colors";
const { purpleCow } = colors;

const HomeTabs = ({ setToken, url, data }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: purpleCow,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Explorer",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} url={url} data={data} />}
      </Tab.Screen>
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => <FavoritesScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"ios-options"} size={size} color={color} />
          ),
        }}
      >
        {(props) => <SettingScreen {...props} setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
