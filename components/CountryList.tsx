import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Country } from "../models/Country";
import { RestTypes } from "../models/RestTypes";
import { styles } from "./CountryList.styles";
import { CountryPage } from "./CountryPage";

export const CountryList: React.FC = () => {
  const [selectedCountry, setCountry] = useState<Country>();
  const countries = useTypedSelector((selector) => selector.country.countries);
  return (
    <View style={styles.container}>
      {selectedCountry === undefined ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {countries.map((country) => (
            <Pressable
              onPress={() => {
                setCountry(countries.find((x) => x.id == country.id));
              }}
              key={country.id}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.pressableCountry,
              ]}
            >
              <Text style={styles.countryNameText}>{country.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <CountryPage
          country={selectedCountry}
          close={() => {
            setCountry(undefined);
          }}
        />
      )}
    </View>
  );
};
