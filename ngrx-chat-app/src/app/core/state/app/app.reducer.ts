import { combineReducers } from "@ngrx/store";
import { usersReducer } from "../user/user.reducer";
import { EStateFeatures, IAppState } from "./app.types";

export const rootReducer = combineReducers<IAppState>({
    [EStateFeatures.Users]: usersReducer,
    [EStateFeatures.Threads]: ThreadsReducer,
});
