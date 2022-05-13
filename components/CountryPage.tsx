import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useDataCtx } from "../hooks";
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
    const [data, setData] = useState(country);
    const ctx = useDataCtx();
    useEffect(() => {
        setData(country);
        console.log("page");
        console.log(country);
    }, [country]);

    const saveAndReturn = () => {
        changeCountry();
        console.log(data);
        close();
    };
    const deleteAndReturn = () => {
        ctx?.deleteCountry(country.id);
        close();
    };

    const changeCountry = () => {
        ctx?.updateCountry({
            name: data.name,
            typesOfRest: data.typesOfRest ? data.typesOfRest : RestTypes[0],
            capital: data.capital,
            continent: data.continent,
            id: data.id,
        });
    };
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.closeButton}
                title="<"
                onPress={saveAndReturn}
            ></Button>
            <Input onChangeText={(t) => setData({ ...data, name: t })}>
                {data.name}
            </Input>
            <Input onChangeText={(t) => setData({ ...data, capital: t })}>
                {data.capital}
            </Input>
            <Input onChangeText={(t) => setData({ ...data, continent: t })}>
                {data.continent}
            </Input>
            <Picker
                onValueChange={(v) => {
                    console.log(v);
                    setData({ ...data, typesOfRest: v });
                }}
                selectedValue={data.typesOfRest}
            >
                <Picker.Item
                    label={RestTypes[0]}
                    value={RestTypes[0]}
                ></Picker.Item>
                <Picker.Item
                    label={RestTypes[1]}
                    value={RestTypes[1]}
                ></Picker.Item>
                <Picker.Item
                    label={RestTypes[2]}
                    value={RestTypes[2]}
                ></Picker.Item>
                <Picker.Item
                    label={RestTypes[3]}
                    value={RestTypes[3]}
                ></Picker.Item>
                <Picker.Item
                    label={RestTypes[4]}
                    value={RestTypes[4]}
                ></Picker.Item>
                <Picker.Item
                    label={RestTypes[5]}
                    value={RestTypes[5]}
                ></Picker.Item>
            </Picker>
            <Button
                onPress={deleteAndReturn}
                buttonStyle={{
                    backgroundColor: "red",
                    alignSelf: "flex-end",
                    marginTop: 400,
                }}
                title="Delete"
            ></Button>
        </View>
    );
};
