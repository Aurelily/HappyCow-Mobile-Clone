import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//import colors
import colors from "../assets/colors";
const { purpleCow } = colors;

export default function SettingsScreen({ setToken }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/logo-total.png")}
        style={styles.pictureStyle}
      />
      <Text style={styles.settingTitle}>App clone setting screen</Text>
      <View>
        <Text style={styles.textSetting}>
          If you want to reload this app demo with Sign In and Sign Up screens,
          yous can log out of app here ! (Warning, your AsyncStorage and
          favorites was clear too)
        </Text>

        <Button
          title="Log Out of the demo app"
          onPress={() => {
            setToken(null);
            AsyncStorage.clear();
          }}
        />
      </View>
      <View>
        <Text style={styles.textSetting}>
          If you just want to reset your favorites for demo, click here to clear
          AsyncStorage of your device (Warning, if you are on a real device,
          other app favorites or informations maybe clear.)
        </Text>
        <Button
          title="Clear AsyncStorage for demo"
          onPress={() => AsyncStorage.clear()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
    width: windowWidth,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSetting: {
    margin: 20,
  },

  settingTitle: {
    color: purpleCow,
    fontWeight: "bold",
    fontSize: 24,
  },
  pictureStyle: {
    width: "100%",
    height: "30%",
    resizeMode: "contain",
  },
});
