import create from "zustand";
import appState from "../store/app";

const useAppState = create(appState);
export default useAppState;
