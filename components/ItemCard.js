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

//import icons
import { AntDesign } from "@expo/vector-icons";

//import components
import IconType from "./IconType";

const ItemCard = ({
  item,
  navigation,
  itemType,
  userLat,
  userLng,
  authorize,
}) => {
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
      <View style={styles.cardCol1}>
        <Image style={styles.itemThumb} source={{ uri: `${item.thumbnail}` }} />
      </View>
      <View style={styles.cardCol2}>
        <View style={styles.itemHeader}>
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

        <Text style={styles.itemDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: "row",
    padding: 5,
    width: "100%",
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardCol1: {
    width: "30%",
  },

  cardCol2: {
    width: "70%",
  },

  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    height: 50,
  },

  headCol1: {
    alignItems: "flex-start",
    // backgroundColor: "yellow",
    width: "80%",
  },

  headCol2: {
    alignItems: "flex-end",
    // backgroundColor: "red",
    width: "20%",
  },

  itemThumb: {
    height: 100,
    width: 100,
    marginRight: 5,
  },
  itemTitle: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  itemKm: {
    fontSize: 12,
    color: "grey",
  },
});
