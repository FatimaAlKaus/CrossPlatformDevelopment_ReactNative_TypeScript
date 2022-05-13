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

import { Button, Dialog } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Country } from "../models/Country";
import {} from "react-native/";
import { RestTypes } from "../models/RestTypes";
import { styles } from "./CountryList.styles";
import { CountryPage } from "./CountryPage";
import { ActionType, CountryAction } from "../store/reducer/CountryReducter";
import { useDataCtx } from "../hooks";

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
        typesOfRest: RestTypes[0],
        id: 0,
    });
    const addCountry = () => {
        ctx?.addCountry(createdCountry);
        setCreatedCountry({
            name: "",
            capital: "",
            continent: "",
            typesOfRest: RestTypes[0],
            id: 0,
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
            addCountry();
            setDialogIsOpen(false);
        }
    };

    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    const ctx = useDataCtx();

    return (
        <View style={styles.container}>
            {!selectedCountry ? (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 10 }}
                    >
                        {ctx?.countries?.map((country) => {
                            return (
                                <Presumable
                                    onPress={() => {
                                        const ctr: Country | undefined =
                                            ctx?.countries?.find(
                                                (x) => x.id == country.id
                                            );
                                        console.log("onPress");
                                        console.log(ctr);
                                        setCountry(ctr);
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
                            );
                        })}
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
