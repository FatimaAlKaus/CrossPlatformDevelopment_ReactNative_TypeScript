import { Picker } from "@react-native-picker/picker";
import React, { Dispatch, useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Country } from "../models/Country";
import { RestTypes } from "../models/RestTypes";
import { Action } from "../store/ActionType";
import { ActionType, CountryAction } from "../store/reducer/CountryReducter";
import { styles } from "./CountryPage.styles";
type CountryPageParam = {
    country: Country;
    close: () => void;
};
export const CountryPage: React.FC<CountryPageParam> = ({ country, close }) => {
    const [restType, setRestType] = useState(country.typesOfRest);
    const [name, setName] = useState(country.name);
    const [capital, setCapital] = useState(country.capital);
    const [continent, setContinent] = useState(country.continent);

    const dispatch = useDispatch();
    const saveAndReturn = () => {
        changeCountry(dispatch);
        close();
    };

    const changeCountry = (dispatch: Dispatch<CountryAction>) => {
        dispatch({
            type: ActionType.CHANGE_COUNTRY,
            payload: {
                ...country,
                continent: continent,
                capital: capital,
                name: name,
                typesOfRest: restType,
            },
        });
    };
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.closeButton}
                title="<"
                onPress={saveAndReturn}
            ></Button>
            <Input onChangeText={(t) => setName(t)}>{name}</Input>
            <Input onChangeText={(t) => setCapital(t)}>{capital}</Input>
            <Input onChangeText={(t) => setContinent(t)}>{continent}</Input>
            <Picker
                onValueChange={(v) => setRestType(v)}
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
