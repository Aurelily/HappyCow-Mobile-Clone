import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Plateform,
  Dimensions,
} from "react-native";

import colors from "../assets/colors";
const { purpleCow, greenCow, pinkVege, pinkVegeOption, yellowStore } = colors;

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
