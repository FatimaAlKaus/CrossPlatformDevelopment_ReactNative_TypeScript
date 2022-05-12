import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../App";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
