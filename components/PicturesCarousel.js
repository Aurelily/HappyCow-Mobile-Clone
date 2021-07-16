import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//carousel library
import Carousel from "react-native-snap-carousel";

const PicturesCarousel = ({ setShowModal, data }) => {
  return (
    <View style={styles.modal}>
      <View style={styles.modalCarousel}>
        <View>
          <Text style={styles.galeryTitle}>
            {data.name} - {data.pictures.length} photos
          </Text>
          <Carousel
            layout="default"
            data={data.pictures}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            renderItem={({ item, index }) => (
              <Image
                key={index}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{ uri: `${item}` }}
              />
            )}
          />
          <View>
            <Button
              title="Retour à la fiche du restaurant"
              onPress={() => {
                setShowModal(false);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PicturesCarousel;

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
  modalCarousel: {
    height: "50%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  galeryTitle: {
    color: "white",
    fontSize: 16,
    paddingBottom: 20,
  },
});
