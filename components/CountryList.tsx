import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Country } from "../models/Country";
import { styles } from "./CountryList.styles";
import { CountryPage } from "./CountryPage";

export const CountryList: React.FC = () => {
  const countries: Array<Country> = [
    {
      id: 1,
      name: "Russia",
      capital: "Moscow",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 2,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 3,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 4,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 5,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 6,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 7,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 8,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 9,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 10,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 11,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 12,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 13,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 14,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 15,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 16,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
    {
      id: 17,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: [],
    },
  ];
  const [selectedCountry, setCountry] = useState<Country>();

  return (
    <View style={styles.container}>
      {selectedCountry == undefined ? (
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
