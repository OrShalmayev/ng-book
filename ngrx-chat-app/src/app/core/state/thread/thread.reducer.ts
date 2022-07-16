import { createReducer, on } from "@ngrx/store";
import { threadActions } from "./thread.actions";
import { IThreadsState } from "./thread.types";

const initialState: IThreadsState = {
    ids: [],
    currentThreadId: null,
    entities: {},
};

export const threadsReducer = createReducer(
    initialState,
    // ADD
    on(
        threadActions.add,
        (state, {thread}) => {
            if (state.ids.includes(thread.id)) {return state};

            return {
                ids: [ ...state.ids, thread.id ],
                currentThreadId: state.currentThreadId,
                entities: Object.assign({}, state.entities, {
                    [thread.id]: thread
                })
            };
        }
    ),
);// END createReducer