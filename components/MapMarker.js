import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, TouchableOpacity } from "react-native";

import IconType from "../components/IconType";

const MapMarker = ({
  item,
  index,

  setPlaceId,

  setMarkSelected,

  setItemStore,
}) => {
  //fonction qui se declanche quand on presse un marker sur la carte
  const handlePress = (id) => {
    // console.log(placeId);
    setPlaceId(id);
    setItemStore(item);
    setMarkSelected(true);
  };

  return (
    <>
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: item.location.lat,
          longitude: item.location.lng,
        }}
        onPress={() => handlePress(item.placeId)}
      >
        <TouchableOpacity>
          <IconType itemType={item.type} iconSize={1} imgSize={16} />
        </TouchableOpacity>
      </MapView.Marker>
    </>
  );
};

export default MapMarker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
