import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";

//import component
import ItemCard from "../components/ItemCard";

//import colors
import colors from "../assets/colors";
const { purpleCow } = colors;

//Dimension des ecrans
const windowWidth = Dimensions.get("window").width;

const FavoritesScreen = ({ navigation, userLat, userLng, authorize }) => {
  // Je stocke l'async storage dans un state
  const [store, setStore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const awaitStorage = async () => {
      let fav = await AsyncStorage.getItem("fav");
      let favTab = fav ? JSON.parse(fav) : [];
      setStore(favTab);
      setIsLoading(false);
    };
    awaitStorage();
  }, [store]);

  return (
    <View style={styles.container}>
      <View style={styles.favTitleContent}>
        <Text style={styles.favTitle}>Mes favoris</Text>
      </View>
      <FlatList
        data={store}
        keyExtractor={(item) => JSON.stringify(item.placeId)}
        renderItem={({ item }) => {
          return isLoading ? (
            <View>
              <ActivityIndicator />
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
        }}
      />

      <Button
        title="Clear AsyncStorage for demo"
        onPress={() => AsyncStorage.clear()}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  favTitleContent: {
    backgroundColor: purpleCow,
    width: windowWidth,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  favTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
