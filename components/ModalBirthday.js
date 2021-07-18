import React, { useState } from "react";
import { StyleSheet } from "react-native";

//NumberPlease library
import NumberPlease from "react-native-number-please";

const ModalBirthday = ({ yearBirth, setyearBirth }) => {
  const date = [
    { id: "year", label: "", min: 1900, max: new Date().getFullYear() },
  ];

  return (
    <NumberPlease
      digits={date}
      values={yearBirth}
      onChange={(values) => setyearBirth(values)}
      pickerStyle={styles.inputSignUp}
      itemStyle={{ height: 150 }}
    />
  );
};

export default ModalBirthday;

const styles = StyleSheet.create({
  inputSignUp: {
    backgroundColor: "white",
    width: 300,
    height: 150,
    marginBottom: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
});
