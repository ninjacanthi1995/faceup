import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SnapScreen from "./screens/SnapScreen";
import GalleryScreen from "./screens/GalleryScreen";
import HomeScreen from "./screens/HomeScreen";

import { Ionicons } from "@expo/vector-icons";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import photoUrls from "./reducers/photoUrls.reducer";

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Gallery") {
            iconName = focused ? "images" : "images-outline";
          } else if (route.name === "Snap") {
            iconName = focused ? "camera" : "camera-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        style: {
          backgroundColor: "#111224",
        },
      }}
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const store = createStore(combineReducers({ photoUrls }));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomNav" component={BottomNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
