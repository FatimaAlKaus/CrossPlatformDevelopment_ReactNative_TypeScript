import { CountryList } from "./components/CountryList";
import { Provider, useDispatch } from "react-redux";
import {
    ActionType,
    CountryAction,
    CountryReducer,
} from "./store/reducer/CountryReducter";
import { createStore } from "redux";
import { useEffect } from "react";

const rootReducer = CountryReducer;
const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

export default function App() {
    useEffect(() => {}, []);
    return (
        <Provider store={store}>
            <CountryList />
        </Provider>
    );
}
