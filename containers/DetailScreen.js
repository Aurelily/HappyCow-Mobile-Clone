import React, { useState, useEffect } from "react";
import * as geolib from "geolib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking, Alert, Platform } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Package react-native-maps pour afficher une Map
import MapView from "react-native-maps";

//import colors
import colors from "../assets/colors";
const {
  purpleCow,
  greenCow,
  pinkVegOption,
  yellowStore,
  blueOther,
  pinkIceCream,
  orangeJuice,
  brownBakery,
  blueCattering,
  blueBnB,
} = colors;

//import component
import IconType from "../components/IconType";
import PictureButton from "../components/PictureButton";
import PicturesCarousel from "../components/PicturesCarousel";

//icons
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

function DetailScreen({ route, navigation, favList, manageFavorites }) {
  const data = route.params.item;
  const userLat = route.params.userLat;
  const userLng = route.params.userLng;
  const authorize = route.params.authorize;
  const itemType = data.type;
  const id = data.placeId;
  const [favoris, setFavoris] = useState("gray");
  const [showModal, setShowModal] = useState(false);

  //Fonction qui calcule la distance entre le user et un restau si la loc est autorisée
  const calcDistance = (latPlace, longPlace) => {
    let distanceKm =
      geolib.getDistance(
        { latitude: userLat, longitude: userLng },
        { latitude: latPlace, longitude: longPlace }
      ) / 1000;
    return distanceKm.toFixed(1);
  };
  //Fonction qui gère les différents styles graphique des pages en fonction du type de restaurant
  const itemStyle = () => {
    if (itemType === "Veg Store" || itemType === "Health Store")
      return styles.store;
    if (itemType === "vegan") return styles.vegan;
    if (itemType === "vegetarian") return styles.vegetarian;
    if (itemType === "veg-options") return styles.vegOption;
    if (itemType === "Other" || itemType === "Professional")
      return styles.other;
    if (itemType === "Bakery") return styles.bakery;
    if (itemType === "Catering") return styles.catering;
    if (itemType === "B&B") return styles.bnb;
    if (itemType === "Ice Cream") return styles.iceCream;
    if (itemType === "Juice Bar") return styles.juiceBar;
  };

  //fonction pour afficher les étoiles du rating de la home
  const displayStar = (value) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        tab.push(<AntDesign name="star" size={16} color="yellow" key={i} />);
      } else {
        tab.push(<AntDesign name="star" size={16} color="white" key={i} />);
      }
    }
    return tab;
  };

  //Fonction qui gère les appels téléphoniques
  const callNumber = (phone) => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  // Si les favoris existes, on les appelle depuis l'Async Storage
  useEffect(() => {
    const isFavorisExist = async () => {
      const fav = await AsyncStorage.getItem("fav");
      const userFav = JSON.parse(fav);
      if (fav !== null && fav !== undefined) {
        console.log("userFav ", userFav);
        if (userFav.some((item) => item.placeId === data.placeId)) {
          if (data.placeId === id) {
            setFavoris(!favoris);
          }
        }
      } else {
        AsyncStorage.removeItem("fav");
      }
    };
    isFavorisExist();
  }, [id]);

  return (
    <>
      {showModal && (
        <PicturesCarousel
          showModal={showModal}
          setShowModal={setShowModal}
          data={data}
        />
      )}
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        {/* -----------------------------------------------------------------*/}
        {/* Header zone  */}
        <View style={[styles.headerDetail, itemStyle()]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              manageFavorites({
                placeId: data.placeId,
                thumbnail: data.thumbnail,
                name: data.name,
                type: data.type,
                description: data.description,
                rating: data.rating,
                website: data.website,
                phone: data.phone,
                userLat: userLat,
                userLng: userLng,
                authorize: authorize,
                pictures: data.pictures,
                location: data.location,
              });
              setFavoris(!favoris);
              console.log(favList);
            }}
          >
            {favoris ? (
              <AntDesign name="staro" size={24} color="white" />
            ) : (
              <AntDesign name="star" size={24} color="yellow" />
            )}
          </TouchableOpacity>
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* PICTURES GALERY */}
        <View style={styles.picturesZone}>
          {data.pictures.length === 0 || data.pictures.length === 1 ? (
            <View style={styles.pictCol1Solo}>
              <Image
                style={styles.mainThumbSolo}
                source={{ uri: `${data.thumbnail}` }}
              />
            </View>
          ) : (
            <View style={styles.pictCol1}>
              <Image
                style={styles.mainThumb}
                source={{ uri: `${data.thumbnail}` }}
              />
            </View>
          )}

          {data.pictures.length > 2 ? (
            <View style={styles.pictCol2}>
              <Image
                style={styles.miniThumb}
                source={{ uri: `${data.pictures[0]}` }}
              />
              <PictureButton
                data={data}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </View>
          ) : (
            <View style={styles.pictCol2}>
              <Image
                style={styles.miniThumb}
                source={{ uri: `${data.pictures[0]}` }}
              />
              <Image
                style={styles.miniThumb}
                source={{ uri: `${data.pictures[1]}` }}
              />
            </View>
          )}
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* Infos zone  */}
        <View style={[styles.infoZone, itemStyle()]}>
          <View style={styles.infosCol1}>
            <Text style={[styles.txtWhite, styles.titleName]}>{data.name}</Text>
            <View style={styles.ratingStars}>
              <View style={styles.ratingStars}>{displayStar(data.rating)}</View>
              <Text style={[styles.txtWhite, styles.itemRate]}>
                ({data.rating})
              </Text>
            </View>
          </View>
          <View style={styles.infosCol2}>
            <View style={styles.pictoType}>
              <IconType itemType={itemType} iconSize={2} imgSize={24} />
            </View>
            <Text style={[styles.txtWhite, styles.txtUppercase]}>
              {data.type}
            </Text>
            {authorize && (
              <Text style={styles.txtWhite}>
                {calcDistance(data.location.lat, data.location.lng)}km
              </Text>
            )}
          </View>
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* Action zone 1 : gérer les actions  */}
        <View style={styles.actionZone1}>
          <TouchableOpacity style={styles.action1}>
            <View style={styles.iconAction}>
              <FontAwesome name="pencil" size={24} color="grey" />
            </View>
            <Text style={[styles.txtUppercase, styles.txtAlignCenter]}>
              Ajouter un avis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action1}>
            <View style={styles.iconAction}>
              <MaterialIcons name="add-a-photo" size={24} color="grey" />
            </View>
            <Text style={[styles.txtUppercase, styles.txtAlignCenter]}>
              Ajouter une photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action1}
            onPress={() => {
              callNumber(data.phone);
            }}
          >
            <View style={styles.iconAction}>
              <Ionicons name="call" size={24} color="grey" />
            </View>

            <Text style={[styles.txtUppercase, styles.txtAlignCenter]}>
              Appeler
            </Text>
          </TouchableOpacity>
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* Desc zone  */}
        <View style={styles.descZone}>
          <Text style={styles.desc}>{data.description}</Text>
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* Map zone  */}

        <MapView
          style={styles.mapZone}
          // center map on place location:
          initialRegion={{
            latitude: data.location.lat,
            longitude: data.location.lng,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location.lat,
              longitude: data.location.lng,
            }}
          >
            <View>
              <IconType itemType={itemType} iconSize={1} imgSize={16} />
            </View>
          </MapView.Marker>
        </MapView>
        <View style={styles.adressZone}>
          <Text>{data.address}</Text>
        </View>
        {/* -----------------------------------------------------------------*/}
        {/* Action zone 2 : gérer les actions */}
        <TouchableOpacity style={styles.action2}>
          <Ionicons name="time-outline" size={24} color="grey" />
          <Text style={styles.action2Txt}>Heures d'ouverture</Text>
        </TouchableOpacity>
        {data.phone && (
          <TouchableOpacity
            style={styles.action2}
            onPress={() => {
              callNumber(data.phone);
            }}
          >
            <Ionicons name="call" size={24} color="grey" />
            <Text style={styles.action2Txt}>Appeler</Text>
          </TouchableOpacity>
        )}

        {data.website && (
          <TouchableOpacity
            style={styles.action2}
            onPress={() => Linking.openURL(`${data.website}`)}
          >
            <Ionicons name="link" size={24} color="grey" />
            <Text style={styles.action2Txt}>Site web</Text>
          </TouchableOpacity>
        )}
        {data.facebook && (
          <TouchableOpacity
            style={styles.action2}
            onPress={() => Linking.openURL(`${data.facebook}`)}
          >
            <FontAwesome name="facebook-official" size={24} color="grey" />
            <Text style={styles.action2Txt}>Facebook</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.action2}>
          <FontAwesome5 name="directions" size={24} color="grey" />
          <Text style={styles.action2Txt}>Itinéraire</Text>
        </TouchableOpacity>
        {/* -----------------------------------------------------------------*/}
        {/* Rating zone  :  */}
        <View style={styles.ratingZone}>
          <View style={styles.rateCol1}>
            <MaterialIcons name="account-box" size={80} color="lightgray" />
          </View>
          <View style={styles.rateCol2}>
            <Text>Comment évaluez-vous cet endroit ?</Text>
            <View style={styles.stars}>
              <FontAwesome name="star" size={40} color="lightgray" />
              <FontAwesome name="star" size={40} color="lightgray" />
              <FontAwesome name="star" size={40} color="lightgray" />
              <FontAwesome name="star" size={40} color="lightgray" />
              <FontAwesome name="star" size={40} color="lightgray" />
            </View>
          </View>
        </View>

        <Button title="Go back" onPress={() => navigation.goBack()} />
      </ScrollView>
    </>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  //GLOBALS
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtWhite: {
    color: "white",
  },
  txtUppercase: {
    textTransform: "uppercase",
  },
  txtAlignCenter: {
    textAlign: "center",
  },

  //HEADER ZONE
  headerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 10,
    paddingTop: 30,
  },

  //PICTURES ZONE
  picturesZone: {
    flexDirection: "row",
  },

  pictCol1: {
    // backgroundColor: "red",
    width: "70%",
    height: 200,
  },
  pictCol1Solo: {
    // backgroundColor: "red",
    width: "105%",
    height: 200,
    resizeMode: "contain",
  },
  pictCol2: {
    // backgroundColor: "yellow",
    width: "30%",
    height: 200,
    justifyContent: "space-between",
  },
  mainThumb: {
    height: 200,
    width: "99%",
  },
  mainThumbSolo: {
    height: 200,
    width: "100%",
  },
  miniThumb: {
    height: "49%",
    width: "100%",
  },
  modalPicturesContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    height: "49%",
    width: "100%",
  },
  modalPictures: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },

  //INFOS ZONE
  infoZone: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  infosCol2: {
    justifyContent: "center",
    alignItems: "center",
  },
  pictoType: {
    marginTop: -50,
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleName: {
    fontSize: 20,
    marginBottom: 10,
  },

  //Picto color style
  store: {
    backgroundColor: yellowStore,
  },
  vegan: {
    backgroundColor: greenCow,
  },
  vegetarian: {
    backgroundColor: purpleCow,
  },
  other: {
    backgroundColor: blueOther,
  },
  vegOption: {
    backgroundColor: pinkVegOption,
  },
  iceCream: {
    backgroundColor: pinkIceCream,
  },
  juiceBar: {
    backgroundColor: orangeJuice,
  },
  bakery: {
    backgroundColor: brownBakery,
  },
  catering: {
    backgroundColor: blueCattering,
  },
  bnb: {
    backgroundColor: blueBnB,
  },

  //ACTION 1 ZONE
  actionZone1: {
    flexDirection: "row",
  },
  action1: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    marginHorizontal: 1,
  },
  iconAction: {
    marginBottom: 10,
  },

  //DESC ZONE
  descZone: {
    padding: 10,
    backgroundColor: "white",
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  desc: {
    lineHeight: 25,
  },

  //MAP ZONE
  mapZone: {
    backgroundColor: "pink",
    height: 200,
  },
  adressZone: {
    backgroundColor: "whitesmoke",
    height: 80,
    padding: 10,
    justifyContent: "center",
  },
  placeMarker: {
    height: 30,
    width: 30,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 30 / 2,
    overflow: "hidden",
    backgroundColor: purpleCow,
  },

  //ACTIONS 2 ZONE
  action2: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 1,
  },
  action2Txt: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  //RATING ZONE
  ratingZone: {
    flexDirection: "row",
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    padding: 10,
  },
  stars: {
    flexDirection: "row",
  },
});
