import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

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
import IconType from "./IconType";

const ButtonFilter = ({
  filters,
  setFilters,
  itemType,
  iconSize,
  imgSize,
  itemName,
}) => {
  const [selected, setSelected] = useState(false);

  //Function adding filter
  const addFilters = (value) => {
    let filtersCopy = [...filters];
    //if filtersCopy is empty
    if (filtersCopy.length === 0) {
      console.log("tab is empty !");
      setSelected(true);
      filtersCopy.push(value);
      setFilters(filtersCopy);
    } else if (filtersCopy.length >= 1) {
      //if filtersCopy has one or more values
      if (filtersCopy.indexOf(value) === -1) {
        console.log("i push value");
        setSelected(true);
        filtersCopy.push(value);
        setFilters(filtersCopy);
      } else {
        console.log("value is already here !!!");
        setSelected(false);
        for (let i = 0; i < filtersCopy.length; i++) {
          if (filtersCopy.indexOf(value) !== -1) {
            const index = filtersCopy.indexOf(value);
            filtersCopy.splice(index, 1);
            setFilters(filtersCopy);
          }
        }
      }
    }
    console.log(filtersCopy);
  };

  return (
    <TouchableOpacity
      style={selected === true ? styles.btFilterOn : styles.btFilter}
      onPress={() => {
        addFilters(itemType);
      }}
    >
      <IconType itemType={itemType} iconSize={iconSize} imgSize={imgSize} />
      <Text
        style={selected === true ? styles.txtFiltersOn : styles.txtFilters}
        numberOfLines={1}
      >
        {itemName}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonFilter;

const styles = StyleSheet.create({
  btFilter: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 2,
    // flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  btFilterOn: {
    borderColor: "grey",
    backgroundColor: purpleCow,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 2,
    // flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  txtFiltersOn: {
    paddingLeft: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  txtFilters: {
    paddingLeft: 10,
    fontSize: 16,
  },
});
