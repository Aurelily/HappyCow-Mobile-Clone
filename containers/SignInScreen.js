import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";

import Constants from "expo-constants";

//Axios pour envoyer des requetes
const axios = require("axios");

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

// Dimensions
const windowWidth = Dimensions.get("window").width;

//Colors:
import colors from "../assets/colors";
const { purpleCow } = colors;

//Import asyncStorage pour stocker le token
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken, url }) {
  //States of input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigation = useNavigation();

  //handleSubmit function onPress on Sign in button
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${url}user/signin`, {
        email,
        password,
      });
      // console.log(response.data);

      if (response.data.token) {
        const userToken = response.data.token;

        setToken(userToken);

        //Je stock le token et le userId sur le asyncStorage
        await AsyncStorage.setItem("userToken", userToken);

        setIsLoading(false);
      } else {
        setAlert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.data.error === "Unauthorized") {
        setIsLoading(false);
        setAlert("Mauvais email et/ou mot de passe");
      } else {
        setAlert("An error occurred");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View style={styles.pictureZone}>
          <Image
            source={require("../assets/img/photo-signup.png")}
            style={styles.pictureStyle}
          />
        </View>

        <View style={styles.container}>
          {alert && <Text style={styles.errorMessage}>{alert}</Text>}
          <TextInput
            style={styles.inputSignin}
            placeholder="email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.inputSignin}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            disabled={isLoading ? true : false}
            onPress={handleSubmit}
          >
            <Text style={styles.txtButton}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.linkTxt}>
              Vous n'avez pas encore de compte ? inscrivez vous !
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    width: windowWidth,
    height: "100%",
  },
  pictureStyle: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  linkTxt: {
    color: purpleCow,
  },

  inputSignin: {
    backgroundColor: "#E5E4E2",
    width: 300,
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  errorMessage: {
    marginBottom: 20,
    color: "red",
  },

  button: {
    borderColor: purpleCow,
    backgroundColor: purpleCow,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 60,
    marginVertical: 30,
  },

  txtButton: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
