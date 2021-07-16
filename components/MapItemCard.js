import React, { useState } from "react";
import * as geolib from "geolib";
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
const { purpleCow } = colors;
//import icons
import { AntDesign } from "@expo/vector-icons";
//import components
import IconType from "./IconType";

const MapItemCard = ({
  itemStore,
  navigation,
  userLat,
  userLng,
  authorize,
}) => {
  const item = itemStore;
  const itemType = itemStore.type;

  //fonction pour afficher les étoiles du rating de la home
  const displayStar = (value) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        tab.push(<AntDesign name="star" size={16} color="orange" key={i} />);
      } else {
        tab.push(<AntDesign name="star" size={16} color="grey" key={i} />);
      }
    }
    return tab;
  };

  //Fonction qui calcule la distance entre le user et un restau si la loc est autorisée
  const calcDistance = (latPlace, longPlace) => {
    let distanceKm =
      geolib.getDistance(
        { latitude: userLat, longitude: userLng },
        { latitude: latPlace, longitude: longPlace }
      ) / 1000;
    return distanceKm.toFixed(1);
  };

  return (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => {
        navigation.navigate("Detail", {
          item,
          itemType,
          userLat,
          userLng,
          authorize,
        });
      }}
    >
      <View>
        <Image
          style={styles.itemThumb}
          source={{ uri: `${itemStore.thumbnail}` }}
        />
      </View>
      <View style={styles.cardInfos}>
        <View style={styles.headCol1}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingStars}>
            <View style={styles.ratingStars}>{displayStar(item.rating)}</View>
            <Text style={styles.itemRate}>({item.rating})</Text>
          </View>
        </View>
        <View style={styles.headCol2}>
          <IconType itemType={itemType} iconSize={1} imgSize={16} />
          {authorize && (
            <Text style={styles.itemKm}>
              {calcDistance(item.location.lat, item.location.lng)} km
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MapItemCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "white",
    height: 200,
    width: 300,
    zIndex: 2,
    top: 380,
    left: 40,
    borderRadius: 20,
    borderColor: purpleCow,
    borderWidth: 4,
    display: "flex",
    alignItems: "center",
    padding: 5,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemThumb: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: 100,
    width: 292,
    marginTop: -5,
  },
  headCol1: {
    alignItems: "flex-start",
    width: "80%",
  },
  cardCol1: {
    width: "30%",
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  headCol2: {
    alignItems: "flex-end",
    width: "20%",
  },
  cardCol2: {
    width: "70%",
  },
  cardInfos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
