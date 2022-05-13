import { createContext } from "react";
import { Country } from "../models/Country";

export interface DataContextInterface {
    countries: Country[];
    addCountry: (country: Country) => void;
    updateCountry: (country: Country) => void;
    deleteCountry: (id: number) => void;
}

export const DataCtx = createContext<DataContextInterface | null>(null);
