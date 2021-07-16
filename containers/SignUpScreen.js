import React, { useState } from "react";
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

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

//Axios pour envoyer des requetes
const axios = require("axios");

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

//colors
import colors from "../assets/colors";
const { purpleCow } = colors;

//import icons
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function SignUpScreen({ url }) {
  const navigation = useNavigation();

  //States of input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vegeType, setVegeType] = useState("");
  const [location, setLocation] = useState("");
  const [yearBirth, setyearBirth] = useState("");

  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      email &&
      username &&
      password &&
      confirmPassword &&
      vegeType &&
      location &&
      yearBirth
    ) {
      // Si tous les champs sont remplis
      if (password === confirmPassword) {
        // si les 2 MDP sont identiques
        try {
          // on passe à la requête
          const response = await axios.post(`${url}user/signup`, {
            email,
            username,
            password,
            confirmPassword,
            vegeType,
            location,
            yearBirth,
          });

          if (response.data.token) {
            navigation.navigate("SignIn");
          }
        } catch (e) {
          if (
            e.response.data.message === "This email already has an account." ||
            e.response.data.message === "This username already has an account."
          ) {
            setAlert(e.response.data.message);
          } else {
            setAlert("An error occurred");
          }
        }
      } else {
        // si les 2 MDP ne sont pas identiques
        setAlert("MDP doivent être identiques");
      }
    } else {
      // Si tous les champs ne sont pas remplis
      setAlert("Remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View style={styles.pictureZone}>
          <Image
            source={require("../assets/img/photo-signin.jpeg")}
            style={styles.pictureStyle}
          />
        </View>
        <View style={styles.container}>
          {alert && <Text style={styles.errorMessage}>{alert}</Text>}
          <View style={styles.iconsInput}>
            <Entypo name="mail" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="yellowgreen"
            />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Nom d'utilisateur"
              autoCapitalize="none"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <Entypo name="lock" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Mot de passe"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <Entypo name="lock" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Confirmer le mot de passe"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <Entypo name="flower" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Type de végé"
              autoCapitalize="none"
              onChangeText={(text) => {
                setVegeType(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <MaterialIcons name="house" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Ville d'origine"
              autoCapitalize="none"
              onChangeText={(text) => {
                setLocation(text);
              }}
            />
          </View>
          <View style={styles.iconsInput}>
            <FontAwesome name="birthday-cake" size={24} color="yellowgreen" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Année de naissance"
              autoCapitalize="none"
              onChangeText={(text) => {
                setyearBirth(text);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            disabled={isLoading ? true : false}
            onPress={handleSubmit}
          >
            <Text style={styles.txtButton}>S'inscrire</Text>
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
    height: windowHeight,
  },

  inputSignUp: {
    backgroundColor: "white",
    width: 300,
    height: 35,
    marginBottom: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  iconsInput: {
    flexDirection: "row",
    justifyContent: "center",
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
  },

  txtButton: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
  pictureStyle: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  linkTxt: {
    color: purpleCow,
  },
});
