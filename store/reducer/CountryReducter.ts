import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
import { Country } from "../../models/Country";
import { RestTypes } from "../../models/RestTypes";
import * as SQLite from "expo-sqlite";
import { ResultSet } from "expo-sqlite";
import { CountryRepository, ICountryRepository } from "../repository";

// const repository = new CountryRepository(db);
// repository.init();
const initCountries = () => {
    const db = SQLite.openDatabase("countries_db");
    const countries: Country[] = [];
    db.exec(
        [{ sql: "SELECT * FROM countries", args: [] }],
        false,
        (err, res) => {
            if (res) {
                const result = res[0] as SQLite.ResultSet;

                result.rows.forEach((x) => {
                    countries.push({
                        id: x.id,
                        name: x.name,
                        typesOfRest: x.typesOfRest,
                        capital: x.capital,
                        continent: x.continent,
                    });
                });
            }
        }
    );
    return countries;
};

export type CountyState = {
    countries: Country[];
};
const initialState: CountyState = {
    countries: initCountries(),
};
export type CountryAction = {
    type: ActionType;
    payload: Country;
};
export enum ActionType {
    CHANGE_COUNTRY = "CHANGE_COUNTRY",
    CREATE_COUNTRY = "CREATE_COUNTRY",
}
export const CountryReducer = (
    state = initialState,
    action: CountryAction
): CountyState => {
    switch (action.type) {
        case ActionType.CHANGE_COUNTRY:
            return {
                ...state,
                countries: [
                    ...state.countries.filter((x) => x.id != action.payload.id),
                    action.payload,
                ],
            };
        case ActionType.CREATE_COUNTRY:
        // const country = action.payload;
        // const err = repository.add(country);
        // if (err) {
        //     console.log(err);
        // }
        // return {
        //     ...state,
        //     countries: repository.getAll(),
        // };
        default:
            return state;
    }
};
