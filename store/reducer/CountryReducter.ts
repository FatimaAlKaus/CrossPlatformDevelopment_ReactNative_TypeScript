import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
import { Country } from "../../models/Country";
import { RestTypes } from "../../models/RestTypes";
import * as SQLite from "expo-sqlite";
import { ResultSet } from "expo-sqlite";
import { CountryRepository, ICountryRepository } from "../repository";

const db = SQLite.openDatabase("countries_db");
const repository = new CountryRepository(db);
repository.init();

export type CountyState = {
    countries: Country[];
};
const initialState: CountyState = {
    countries: repository.getAll()[1]!,
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
            const country = action.payload;
            const err = repository.add(country);
            if (err) {
                console.log(err);
            }
            return {
                ...state,
                countries: repository.getAll()[1]!,
            };
        default:
            return state;
    }
};
