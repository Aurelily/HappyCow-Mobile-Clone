import React from "react";
import { Image, StyleSheet } from "react-native";

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
