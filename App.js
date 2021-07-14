// In App.js in a new project
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import axios for request API
import axios from "axios";

//Gère la statusBar du téléphone
import { StatusBar } from "expo-status-bar";

//import containers
import DetailScreen from "./containers/DetailScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SignInScreen from "./containers/SignInScreen";
import MapScreen from "./containers/MapScreen";
import SplashScreen from "./containers/SplashScreen";

//import component
import LogoText from "./components/LogoText";

//import colors
import colors from "./assets/colors";
const { purpleCow } = colors;

// Screens Bottom Tab navigator : Home, Favorites, Settings
import HomeTabs from "./containers/HomeTabs";

//Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//variable URL
const url = "http://localhost:3001/";
// const url = "https://lily-happycow.herokuapp.com/";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  // Favoris
  const [favList, setFavList] = useState([]);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  // // getUserId function to save userId inAsyncStorage
  // const getUserId = async (userId) => {
  //   if (userId) {
  //     AsyncStorage.setItem("userId", userId);
  //   } else {
  //     AsyncStorage.removeItem("userId");
  //   }
  //   setUserId(userId);
  // };

  // Favorites management function
  const manageFavorites = async (result) => {
    const favCopy = [...favList];
    const exist = favCopy.find((elem) => elem.placeId === result.placeId);
    if (!exist) {
      favCopy.push(result);
      setFavList(favCopy);
      AsyncStorage.setItem("fav", JSON.stringify(favCopy));
      console.log("favorisAdded ", favCopy);
    } else {
      const index = favCopy.indexOf(exist);
      favCopy.splice(index, 1);
      setFavList(favCopy);
      AsyncStorage.setItem("fav", JSON.stringify(favCopy));
      console.log("favorisRemoved ", favCopy);
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        // We should also handle error for production apps
        const userToken = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");

        // This will switch to the Home screen or Signin screen and this loading
        // screen will be unmounted and thrown away.
        //Time : simulate uploading Splash Screen for 3 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        setUserToken(userToken);
        setUserId(userId);
      } catch (error) {
        alert(error.message);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {isLoading && <SplashScreen />}
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{
              // title: "Happy Cow",
              title: <LogoText />,
              headerStyle: { backgroundColor: purpleCow },
              headerTitleStyle: { color: "white" },
            }}
          >
            {() => <SignInScreen setToken={setToken} url={url} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              // title: "Happy Cow",
              title: <LogoText />,
              headerStyle: { backgroundColor: purpleCow },
              headerTitleStyle: { color: "white" },
              headerBackTitle: null,
            }}
          >
            {() => <SignUpScreen setToken={setToken} url={url} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              // title: "Happy Cow",
              title: <LogoText />,
              headerStyle: { backgroundColor: purpleCow },
              headerTitleStyle: { color: "white" },
            }}
          >
            {(props) => <HomeTabs {...props} setToken={setToken} url={url} />}
          </Stack.Screen>
          <Stack.Screen
            name="Detail"
            options={{
              title: "Detail",
              headerStyle: { backgroundColor: purpleCow },
              headerTitleStyle: { color: "white" },
              headerShown: false,
            }}
          >
            {(props) => (
              <DetailScreen
                {...props}
                favList={favList}
                setFavList={setFavList}
                manageFavorites={manageFavorites}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Maps"
            options={{
              title: "Autour de moi",
              headerStyle: { backgroundColor: purpleCow },
              headerTitleStyle: { color: "white" },
            }}
          >
            {(props) => <MapScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Splash">
            {(props) => <SplashScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
