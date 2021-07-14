import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";

//Pour la recherche autocoplete GooglePlace
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API_KEY } from "@env";

//Import axios for request
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";

//import colors
import colors from "../assets/colors";
const { purpleCow, greenCow } = colors;

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Import icons library
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Import components
import IconType from "../components/IconType";
import MapMarker from "../components/MapMarker";
import MapItemCard from "../components/MapItemCard";
import ItemCard from "../components/ItemCard";

const MapScreen = ({ route, navigation, url }) => {
  // //je recupere les parametres
  const userLat = route.params.userLat;
  const userLng = route.params.userLng;
  const data = route.params.data;
  const authorize = route.params.authorize;

  const dataAround = data.slice(0, 100);

  const [markSelected, setMarkSelected] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [itemStore, setItemStore] = useState([]);

  //moteur de recherche par localité
  const [input, setInput] = useState("");
  const [userLoc2, setUserLoc2] = useState(false);
  const [userLat2, setUserLat2] = useState(userLat);
  const [userLng2, setUserLng2] = useState(userLng);

  const mapRef = useRef();

  //fonction pour bouger la carte vers la nouvelle location
  const changeLocation = (userLat2, userLng2) => {
    const latitude = userLat2;
    const longitude = userLng2;
    mapRef.current.animateToRegion({
      latitude: userLat2,
      longitude: userLng2,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  //fonction pour changer la location initial du user
  const handleSubmit = async () => {
    try {
      let response;
      if (input) {
        response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name,geometry&locationbias&key=${GOOGLE_API_KEY}`
        );
      }
      console.log(response.data.candidates[0].geometry.location);
      setUserLoc2(true);
      setUserLat2(response.data.candidates[0].geometry.location.lat);
      setUserLng2(response.data.candidates[0].geometry.location.lng);
      changeLocation(
        response.data.candidates[0].geometry.location.lat,
        response.data.candidates[0].geometry.location.lng
      );
    } catch (error) {
      alert(error.message);
    }
  };

  //fonction pour réinitialiser la location initial du user
  const reinitMap = (latInit, longInit) => {
    setUserLoc2(false);
    changeLocation(latInit, longInit);
  };

  return (
    <>
      <View style={styles.searchZone}>
        {/* <GooglePlacesAutocomplete
          placeholder="Chercher par localité"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "fr",
            components: "country:fr",
          }}
        /> */}
        <View style={styles.inputSearch}>
          <TouchableOpacity
            style={styles.compass}
            onPress={() => {
              reinitMap(userLat, userLng);
            }}
          >
            <MaterialCommunityIcons name="target" size={30} color="lightgray" />
          </TouchableOpacity>
          <TextInput
            placeholder="Rechercher par localité"
            autoCapitalize="none"
            onChangeText={(text) => {
              setInput(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonGo}>
          <Text style={styles.buttonGoTxt}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapZone}>
        {markSelected && (
          <MapItemCard
            itemStore={itemStore}
            placeId={placeId}
            navigation={navigation}
            userLat={userLat}
            userLng={userLng}
            authorize={authorize}
          />
        )}
        <MapView
          ref={mapRef}
          style={styles.map}
          // center map on place location:
          initialRegion={{
            latitude: userLat,
            longitude: userLng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {userLoc2 ? (
            <MapView.Marker
              coordinate={{
                latitude: userLat2,
                longitude: userLng2,
              }}
            >
              <View style={styles.userMarker}>
                <View style={styles.userMarkerShiny}></View>
              </View>
            </MapView.Marker>
          ) : (
            <MapView.Marker
              coordinate={{
                latitude: userLat,
                longitude: userLng,
              }}
            >
              <View style={styles.userMarker}>
                <View style={styles.userMarkerShiny}></View>
              </View>
            </MapView.Marker>
          )}

          {dataAround.map((item, index) => {
            return (
              <MapMarker
                key={index}
                item={item}
                index={placeId}
                placeId={placeId}
                setPlaceId={setPlaceId}
                markSelected={markSelected}
                setMarkSelected={setMarkSelected}
                itemStore={itemStore}
                setItemStore={setItemStore}
              />
            );
          })}
        </MapView>
      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: 100,
  },

  //SEARCH ZONE
  searchZone: {
    backgroundColor: purpleCow,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  inputSearch: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  compass: {
    marginRight: 10,
  },
  buttonGo: {
    backgroundColor: greenCow,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 5,
  },
  buttonGoTxt: {
    fontWeight: "bold",
    color: "white",
  },

  //MAP ZONE
  mapZone: {
    backgroundColor: "pink",
    height: "100%",
    width: "100%",
  },
  map: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  //marker styles
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 112, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  userMarker: {
    height: 30,
    width: 30,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 30 / 2,
    overflow: "hidden",
    backgroundColor: purpleCow,
  },
  userMarkerShiny: {
    height: 6,
    width: 6,
    borderRadius: 10 / 2,
    overflow: "hidden",
    backgroundColor: "white",
    top: 5,
    left: 5,
  },

  //MODAL STORE
  itemCard: {
    backgroundColor: "white",
    height: 200,
    width: 350,
    zIndex: 2,
    top: 450,
    left: 20,
    borderRadius: 20,
    borderColor: purpleCow,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: purpleCow,
  },
});
