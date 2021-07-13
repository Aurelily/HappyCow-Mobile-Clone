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

//import colors
import colors from "../assets/colors";
const {
  purpleCow,
  greenCow,
  pinkVege,
  pinkVegOption,
  yellowStore,
  blueOther,
  pinkIceCream,
  orangeJuice,
  brownBakery,
  blueCattering,
  blueBnB,
} = colors;

//icons
import {
  Fontisto,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

const IconType = ({ itemType, iconSize, imgSize }) => {
  const itemStyle = () => {
    if (itemType === "Veg Store" || itemType === "Health Store")
      return styles.store;
    if (itemType === "vegan") return styles.vegan;
    if (itemType === "vegetarian") return styles.vegetarian;
    if (itemType === "veg-options") return styles.vegOption;
    if (itemType === "Other" || itemType === "Professional")
      return styles.other;
    if (itemType === "Bakery") return styles.bakery;
    if (itemType === "Catering") return styles.catering;
    if (itemType === "B&B") return styles.bnb;
    if (itemType === "Ice Cream") return styles.iceCream;
    if (itemType === "Juice Bar") return styles.juiceBar;
  };

  const pictoSize = () => {
    if (iconSize === 2) return styles.sizeMedium;
    if (iconSize === 1) return styles.sizeMini;
  };

  const pictoImg = () => {
    if (itemType === "Veg Store" || itemType === "Health Store")
      return <Fontisto name="shopping-store" size={imgSize} color="white" />;
    if (itemType === "vegan")
      return <Ionicons name="ios-leaf" size={imgSize} color="white" />;
    if (itemType === "vegetarian")
      return <Ionicons name="ios-leaf" size={imgSize} color="white" />;
    if (itemType === "veg-options")
      return <Ionicons name="ios-leaf" size={imgSize} color="white" />;
    if (itemType === "Other" || itemType === "Professional")
      return <Ionicons name="leaf-outline" size={imgSize} color="white" />;
    if (itemType === "Bakery")
      return (
        <MaterialCommunityIcons name="cupcake" size={imgSize} color="white" />
      );
    if (itemType === "Catering")
      return <Ionicons name="restaurant" size={imgSize} color="white" />;
    if (itemType === "B&B")
      return <FontAwesome name="bed" size={imgSize} color="white" />;
    if (itemType === "Ice Cream")
      return <MaterialIcons name="icecream" size={imgSize} color="white" />;
    if (itemType === "Juice Bar")
      return <Entypo name="drink" size={imgSize} color="white" />;
  };

  return (
    <View style={[itemStyle(), pictoSize(), styles.picContent]}>
      {pictoImg()}
    </View>
  );
};

export default IconType;

const styles = StyleSheet.create({
  picContent: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },

  //Picto color style
  store: {
    backgroundColor: yellowStore,
  },
  vegan: {
    backgroundColor: greenCow,
  },
  vegetarian: {
    backgroundColor: purpleCow,
  },
  other: {
    backgroundColor: blueOther,
  },
  vegOption: {
    backgroundColor: pinkVegOption,
  },
  iceCream: {
    backgroundColor: pinkIceCream,
  },
  juiceBar: {
    backgroundColor: orangeJuice,
  },
  bakery: {
    backgroundColor: brownBakery,
  },
  catering: {
    backgroundColor: blueCattering,
  },
  bnb: {
    backgroundColor: blueBnB,
  },

  //Picto size style
  sizeMedium: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 2,
  },

  sizeMini: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
  },
});
