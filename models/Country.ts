import { RestTypes } from "./RestTypes";

export type Country = {
  id: number;
  name: string;
  continent: string;
  capital: string;
  typesOfRest: RestTypes;
};
