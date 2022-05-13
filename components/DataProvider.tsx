import { useCallback, useEffect, useMemo, useState } from "react";
import { Country } from "../models/Country";
import { DataContextInterface, DataCtx } from "../store/context";
import * as SQLite from "expo-sqlite";
import { RestTypes } from "../models/RestTypes";
export const DataProvider: React.FC = ({ children }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [updatedCountries, setUpdatedCountries] = useState<Country[]>([]);
    const add = useCallback((country: Country) => {
        console.log("add");
        console.log(country);
        const db = SQLite.openDatabase("countries_db");
        db.exec(
            [
                {
                    sql: "INSERT INTO countries(name,capital,continent,typeOfRest) VALUES(?,?,?,?)",
                    args: [
                        country.name,
                        country.capital,
                        country.continent,
                        country.typesOfRest,
                    ],
                },
            ],
            false,
            () => {}
        );
        loadCountries();
    }, []);
    const deleteCountry = useCallback((id: number) => {
        const db = SQLite.openDatabase("countries_db");
        db.exec(
            [
                {
                    sql: "DELETE FROM countries WHERE id=?",
                    args: [id],
                },
            ],
            false,
            () => {}
        );
        loadCountries();
    }, []);
    const updateCountry = useCallback((country: Country) => {
        const db = SQLite.openDatabase("countries_db");
        db.exec(
            [
                {
                    sql: "DELETE FROM countries WHERE id=?",
                    args: [country.id],
                },
                {
                    sql: "INSERT INTO countries(name,capital,continent,typeOfRest) VALUES(?,?,?,?)",
                    args: [
                        country.name,
                        country.capital,
                        country.continent,
                        country.typesOfRest,
                    ],
                },
            ],
            false,
            () => {}
        );
        loadCountries();
    }, []);
    const loadCountries = () => {
        const db = SQLite.openDatabase("countries_db");
        db.exec(
            [
                {
                    sql: "SELECT id,name,typeOfRest,capital,continent FROM countries",
                    args: [],
                },
            ],
            false,
            (_, res) => {
                if (res) {
                    const result = res[0] as SQLite.ResultSet;

                    setUpdatedCountries(
                        result.rows.map((x) => {
                            return {
                                id: x.id,
                                name: x.name,
                                typesOfRest: x.typesOfRest,
                                capital: x.capital,
                                continent: x.continent,
                            };
                        })
                    );
                }
            }
        );
    };
    useEffect(() => {
        console.log("effect");
        setCountries(updatedCountries);
    }, [updatedCountries]);
    useEffect(() => {
        console.log("effect1");
        const db = SQLite.openDatabase("countries_db");
        db.exec(
            [{ sql: "SELECT * FROM countries", args: [] }],
            false,
            (_, res) => {
                if (res) {
                    const result = res[0] as SQLite.ResultSet;

                    setCountries(
                        result.rows.map((x) => {
                            return {
                                id: x.id,
                                name: x.name,
                                typesOfRest: x.typesOfRest,
                                capital: x.capital,
                                continent: x.continent,
                            };
                        })
                    );
                }
            }
        );
    }, []);

    const ctxValue = useMemo<DataContextInterface>(
        () => ({
            countries: countries,
            addCountry: add,
            updateCountry: updateCountry,
            deleteCountry: deleteCountry,
        }),
        [countries, add, updateCountry, deleteCountry]
    );

    return <DataCtx.Provider value={ctxValue}>{children}</DataCtx.Provider>;
};
