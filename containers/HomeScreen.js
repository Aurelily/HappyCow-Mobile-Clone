import React, { useState, useEffect } from "react";

//For geolocalisation
import * as Location from "expo-location";

//Import axios for request
import axios from "axios";

//Import icons library
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//import colors
import colors from "../assets/colors";
const { purpleCow } = colors;

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//import components
import ItemCard from "../components/ItemCard";
import FiltersBar from "../components/FiltersBar";

export default function HomeScreen({ navigation, url }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [authorize, setAuthorize] = useState(false);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  //SearchBar
  const [search, setSearch] = useState("");

  //Toggle filters buttons
  const [filters, setFilters] = useState([]);

  //Chargement des données de l'API
  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        let response;

        if (status === "granted") {
          //get places around
          setAuthorize(true);
          const location = await Location.getCurrentPositionAsync();

          const lat = location.coords.latitude;
          const lng = location.coords.longitude;
          setUserLat(lat);
          setUserLng(lng);

          response = await axios.get(
            `${url}restaurants?name=${search}&types=${filters}&latitude=${lat}&longitude=${lng}`
          );
        } else {
          //get all places
          response = await axios.get(
            `${url}restaurants?name=${search}&types=${filters}`
          );
        }

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    getLocationAndData();
  }, [filters, search]);

  // Footer de la flatlist contenant le loader
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator
            color="#9069CD"
            style={{ margin: 30, height: 100 }}
          />
        ) : null}
      </View>
    );
  };
  //Fonction de rendu des éléments de la Flatlist pour optimisation des performances
  const renderItem = ({ item }) => {
    return isLoading ? (
      <View>
        <ActivityIndicator />
        <Text>Chargement des lieux...</Text>
      </View>
    ) : (
      <ItemCard
        item={item}
        navigation={navigation}
        itemType={item.type}
        userLat={userLat}
        userLng={userLng}
        authorize={authorize}
      />
    );
  };

  return (
    <>
      <View style={styles.searchZone}>
        <TouchableOpacity
          style={styles.compass}
          onPress={() => {
            navigation.navigate("Maps", {
              userLat,
              userLng,
              data,
              authorize,
            });
          }}
        >
          <Entypo name="compass" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.inputSearch}>
          <TextInput
            placeholder="Rechercher par nom"
            autoCapitalize="none"
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FiltersBar filters={filters} setFilters={setFilters} />
        <FlatList
          data={data}
          keyExtractor={(item) => JSON.stringify(item.placeId)}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
    width: windowWidth,
    height: windowHeight,
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
});
