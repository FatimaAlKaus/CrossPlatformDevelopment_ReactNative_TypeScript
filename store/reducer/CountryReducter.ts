import { Country } from "../../models/Country";
import { RestTypes } from "../../models/RestTypes";

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
];
export type CountyState = {
  countries: Country[];
};
const inititalState: CountyState = {
  countries: countries,
};
export type CountryAction = {
  type: ActionType;
  payload: Country;
};
export enum ActionType {
  CHANGE_COUNTY = "CHANGE_COUNTRY",
}

export const CountryReducer = (
  state = inititalState,
  action: CountryAction
): CountyState => {
  switch (action.type) {
    case ActionType.CHANGE_COUNTY:
      return {
        ...state,
        countries: [
          ...state.countries.filter((x) => x.id != action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
};
