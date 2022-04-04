import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-elements";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Country } from "./models/Country";
import { RestTypes } from "./models/RestTypes";
import { useState } from "react";
import { CountryPage } from "./components/CountryPage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CountryList } from "./components/CountryList";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  return <CountryList />;
}
