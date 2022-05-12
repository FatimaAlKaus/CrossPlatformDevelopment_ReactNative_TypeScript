import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, {
    Dispatch,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TextInput } from "react-native-paper";

import {
    Pressable as Presumable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Button, Dialog, Icon } from "react-native-elements";
import { connect, useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Country } from "../models/Country";
import {} from "react-native/";
import { RestTypes } from "../models/RestTypes";
import { styles } from "./CountryList.styles";
import { CountryPage } from "./CountryPage";
import { ActionType, CountryAction } from "../store/reducer/CountryReducter";

export const CountryList: React.FC = () => {
    const [selectedCountry, setCountry] = useState<Country>();

    const [errorFields, setErrorFields] = useState<boolean[]>([
        false,
        false,
        false,
    ]);
    const [createdCountry, setCreatedCountry] = useState<Country>({
        name: "",
        capital: "",
        continent: "",
        typesOfRest: RestTypes.ActiveHoliday,
        id: 0,
    });
    const dispatch = useDispatch();
    const addCountry = (dispatch: Dispatch<CountryAction>) => {
        dispatch({
            type: ActionType.CREATE_COUNTRY,
            payload: {
                id: createdCountry.id,
                name: createdCountry.name,
                capital: createdCountry.capital,
                continent: createdCountry.continent,
                typesOfRest: createdCountry.typesOfRest,
            },
        });
    };
    const onSave = () => {
        setErrorFields([
            !createdCountry.name,
            !createdCountry.capital,
            !createdCountry.continent,
        ]);
        if (
            createdCountry.capital &&
            createdCountry.continent &&
            createdCountry.name
        ) {
            addCountry(dispatch);
            setDialogIsOpen(false);
        }
    };

    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    const countries = useTypedSelector((selector) => selector.countries);

    return (
        <View style={styles.container}>
            {!selectedCountry ? (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 10 }}
                    >
                        {countries?.map((country) => (
                            <Presumable
                                onPress={() => {
                                    setCountry(
                                        countries.find(
                                            (x) => x.id == country.id
                                        )
                                    );
                                }}
                                key={country.id}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? "rgb(210, 230, 255)"
                                            : "white",
                                    },
                                    styles.pressableCountry,
                                ]}
                            >
                                <Text style={styles.countryNameText}>
                                    {country.name}
                                </Text>
                            </Presumable>
                        ))}
                    </ScrollView>
                    <Button
                        buttonStyle={styles.addButton}
                        onPress={() => setDialogIsOpen(true)}
                        title="+"
                    />
                </>
            ) : (
                <CountryPage
                    country={selectedCountry}
                    close={() => {
                        setCountry(undefined);
                    }}
                />
            )}
            <Dialog isVisible={dialogIsOpen}>
                <View style={styles.dialog}>
                    <View>
                        <TextInput
                            style={{ margin: 5 }}
                            error={errorFields[0]}
                            label="Name"
                            autoComplete={true}
                            value={createdCountry.name}
                            onChangeText={(text) => {
                                setCreatedCountry({
                                    ...createdCountry,
                                    name: text,
                                });
                            }}
                        />
                        <TextInput
                            autoComplete={true}
                            error={errorFields[1]}
                            style={{ margin: 5 }}
                            label="Capital"
                            value={createdCountry.capital}
                            onChangeText={(text) => {
                                setCreatedCountry({
                                    ...createdCountry,
                                    capital: text,
                                });
                            }}
                        />
                        <TextInput
                            style={{ margin: 5 }}
                            autoComplete={true}
                            error={errorFields[2]}
                            label="Continent"
                            value={createdCountry.continent}
                            onChangeText={(text) => {
                                setCreatedCountry({
                                    ...createdCountry,
                                    continent: text,
                                });
                            }}
                        />
                        <Picker
                            onValueChange={(v) =>
                                setCreatedCountry({
                                    ...createdCountry,
                                    typesOfRest: v,
                                })
                            }
                            selectedValue={createdCountry.typesOfRest}
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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button onPress={() => onSave()} title="Save" />
                        <Button
                            buttonStyle={{ backgroundColor: "red" }}
                            title="Close"
                            onPress={() => setDialogIsOpen(false)}
                        />
                    </View>
                </View>
            </Dialog>
        </View>
    );
};
