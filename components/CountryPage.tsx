import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { Country } from "../models/Country";
import { RestTypes } from "../models/RestTypes";
import { styles } from "./CountryPage.styles";
type CountryPageParam = {
  country: Country;
  close: () => void;
};
export const CountryPage: React.FC<CountryPageParam> = ({ country, close }) => {
  const [restType, setRestType] = useState(country.typesOfRest);
  return (
    <View style={styles.container}>
      <Button buttonStyle={styles.closeButton} onPress={close}></Button>
      <Input>{country.name}</Input>
      <Input>{country.capital}</Input>
      <Input>{country.continent}</Input>
      <Picker
        onValueChange={(v, index) => setRestType(v)}
        selectedValue={restType}
      >
        <Picker.Item
          label={RestTypes.ActiveHoliday}
          value={RestTypes.ActiveHoliday}
        ></Picker.Item>
        <Picker.Item
          label={RestTypes.Camping}
          value={RestTypes.Camping}
        ></Picker.Item>
        <Picker.Item
          label={RestTypes.PackageHoliday}
          value={RestTypes.PackageHoliday}
        ></Picker.Item>
        <Picker.Item
          label={RestTypes.SummerHoliday}
          value={RestTypes.SummerHoliday}
        ></Picker.Item>
        <Picker.Item
          label={RestTypes.WalkingHoliday}
          value={RestTypes.WalkingHoliday}
        ></Picker.Item>
        <Picker.Item
          label={RestTypes.WinterHoliday}
          value={RestTypes.WinterHoliday}
        ></Picker.Item>
      </Picker>
    </View>
  );
};
