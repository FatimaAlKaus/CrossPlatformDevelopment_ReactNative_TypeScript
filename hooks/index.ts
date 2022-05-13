import { useContext } from "react";
import { DataCtx } from "../store/context";

export const useDataCtx = () => useContext(DataCtx);
