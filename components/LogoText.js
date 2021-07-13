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
} from "react-native";
import colors from "../assets/colors";

const LogoText = () => {
  return (
    <Image
      source={require("../assets/img/logo-text-white.png")}
      style={styles.logoMini}
    />
  );
};

export default LogoText;

const styles = StyleSheet.create({
  logoMini: {
    height: 20,
    width: 100,
    marginBottom: 10,
  },
});
