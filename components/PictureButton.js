import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PictureButton = ({ data, showModal, setShowModal }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.modalPicturesContent}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Image
          style={styles.miniThumbModal}
          source={{ uri: `${data.pictures[1]}` }}
        />
        <Text style={styles.modalText}>+ {data.pictures.length - 1}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PictureButton;

const styles = StyleSheet.create({
  modalPicturesContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "49%",
    width: "100%",
    position: "relative",
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 25,
  },
  miniThumbModal: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    opacity: 0.5,
  },
});
