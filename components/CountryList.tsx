import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Country } from "../models/Country";
import { RestTypes } from "../models/RestTypes";
import { styles } from "./CountryList.styles";
import { CountryPage } from "./CountryPage";

export const CountryList: React.FC = () => {
  const countries: Array<Country> = [
    {
      id: 1,
      name: "Russia",
      capital: "Moscow",
      continent: "Eurasia",
      typesOfRest: RestTypes.WinterHoliday,
    },
    {
      id: 2,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 3,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.ActiveHoliday,
    },
    {
      id: 4,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.PackageHoliday,
    },
    {
      id: 5,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.SummerHoliday,
    },
    {
      id: 6,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.WalkingHoliday,
    },
    {
      id: 7,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.WinterHoliday,
    },
    {
      id: 8,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.SummerHoliday,
    },
    {
      id: 9,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.ActiveHoliday,
    },
    {
      id: 10,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 11,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.PackageHoliday,
    },
    {
      id: 12,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 13,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 14,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 15,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 16,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
    },
    {
      id: 17,
      name: "China",
      capital: "Pekin",
      continent: "Eurasia",
      typesOfRest: RestTypes.Camping,
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
