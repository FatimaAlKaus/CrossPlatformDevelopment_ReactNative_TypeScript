import { Country } from "../../models/Country";
import * as SQLite from "expo-sqlite";

type Error = {
    message: string;
};
type err = Error | null;
export interface ICountryRepository {
    db: SQLite.WebSQLDatabase;
    add(country: Country): err;
    getById(id: number): [err, Country | null];
    getAll(): [err, Country[] | null];
    delete(id: number): err;
    update(country: Country): [err, Country | null];
    init(): err;
}
export class CountryRepository implements ICountryRepository {
    db: SQLite.WebSQLDatabase;
    constructor(db: SQLite.WebSQLDatabase) {
        this.db = db;
    }
    add(country: Country): err {
        let error: err = null;
        this.db.exec(
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
            (err) => {
                if (err) {
                    error = { message: err.message };
                }
            }
        );
        return error;
    }
    getById(id: number): [err, Country | null] {
        let error: err = null;
        let country: Country | null = null;
        this.db.exec(
            [{ sql: "SELECT * FROM countries WHERE id=?", args: [id] }],
            false,
            (err, res) => {
                if (err) {
                    error = err;
                }
                if (res) {
                    const result = res[0] as SQLite.ResultSet;

                    const x = result.rows[0];
                    country = {
                        id: x.id,
                        name: x.name,
                        typesOfRest: x.typesOfRest,
                        capital: x.capital,
                        continent: x.continent,
                    };
                }
            }
        );
        if (error) {
            return [error, null];
        }
        return [null, country];
    }
    getAll(): [err, Country[] | null] {
        let error: err = null;
        const countries: Country[] = [];
        this.db.exec(
            [{ sql: "SELECT * FROM countries", args: [] }],
            false,
            (err, res) => {
                if (err) {
                    error = err;
                }
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
        if (error) {
            return [error, null];
        }
        return [null, countries];
    }
    delete(id: number): err {
        throw new Error("Method not implemented.");
    }
    update(country: Country): [err, Country | null] {
        throw new Error("Method not implemented.");
    }
    init(): err {
        let error: err = null;
        this.db.exec(
            [
                {
                    sql: `CREATE TABLE IF NOT EXISTS countries
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name NVARCHAR(30) NOT NULL,
          capital NVARCHAR(30) NOT NULL,
          continent NVAHRCHAR(30) NOT NULL,
          typeOfRest NVARCHAR(30) NOT NULL
        )`,
                    args: [],
                },
            ],
            false,
            (err) => {
                if (err) {
                    error = err;
                }
            }
        );
        return error;
    }
}
