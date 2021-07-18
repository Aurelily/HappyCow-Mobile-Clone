import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//colors
import colors from "../assets/colors";
const { purpleCow } = colors;

const ModalVegType = ({ setShowVegType, setVegeType }) => {
  return (
    <View style={styles.modal}>
      <View style={styles.modalVegeType}>
        <View>
          <Text style={styles.modalTitle}>
            Choisissez votre type de végétarisme
          </Text>

          <View>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Végétarien");
              }}
            >
              <Text>Végétarien</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Végane");
              }}
            >
              <Text>Végane</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Crudivore");
              }}
            >
              <Text>Crudivore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Principalement végétarien");
              }}
            >
              <Text>Principalement végétarien</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Non végétarien");
              }}
            >
              <Text>Non végétarien</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Herbivore");
              }}
            >
              <Text>Herbivore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vegeTypeButton}
              onPress={() => {
                setShowVegType(false);
                setVegeType("Frugivore");
              }}
            >
              <Text>Frugivore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ModalVegType;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "black",
    opacity: 0.9,
    zIndex: 2,
    position: "absolute",
  },
  modalVegeType: {
    height: "60%",
    position: "relative",
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    color: purpleCow,
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 40,
  },
  vegeTypeButton: {
    backgroundColor: "white",
    width: 300,
    height: 35,
    marginBottom: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
});
