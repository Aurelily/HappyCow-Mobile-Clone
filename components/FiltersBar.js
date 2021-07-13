import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//import icons
import { Ionicons } from "@expo/vector-icons";

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

//import components
import IconType from "../components/IconType";
import ButtonFilter from "./ButtonFilter";

const FiltersBar = ({ filters, setFilters }) => {
  return (
    <ScrollView
      style={styles.filtersBar}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {/* <TouchableOpacity style={styles.btFilter}>
        <Ionicons name="filter-outline" size={24} color="grey" />
        <Text style={styles.txtFilters}>Filtres</Text>
      </TouchableOpacity> */}
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"vegan"}
        itemName={"Vegan"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"vegetarian"}
        itemName={"Végétarien"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"veg-options"}
        itemName={"Options végétariennes"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Veg Store"}
        itemName={"Magasin Bio"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Health Store"}
        itemName={"Santé Bio"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Other"}
        itemName={"Autres"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Bakery"}
        itemName={"Boulangerie"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Catering"}
        itemName={"Snack Bio"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Ice Cream"}
        itemName={"Bar glacé"}
        iconSize={1}
        imgSize={16}
      />
      <ButtonFilter
        filters={filters}
        setFilters={setFilters}
        itemType={"Juice Bar"}
        itemName={"Bar à jus"}
        iconSize={1}
        imgSize={16}
      />
    </ScrollView>
  );
};

export default FiltersBar;

const styles = StyleSheet.create({
  //FILTER BAR

  filtersBar: {
    flexDirection: "row",
    padding: 5,
    maxHeight: 100,
  },
});
