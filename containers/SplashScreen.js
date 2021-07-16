import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SplashScreen = () => {
  return (
    <View>
      <Image
        source={require("../assets/img/splash.jpg")}
        style={styles.splash}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    width: windowWidth,
    height: windowHeight,
  },
});
