import { combineReducers } from '@ngrx/store';
import { threadsReducer } from '../thread/thread.reducer';
import { usersReducer } from '../user/user.reducer';
import { EStateFeatures, IAppState } from './app.types';

export const rootReducer = combineReducers<IAppState>({
    [EStateFeatures.Users]: usersReducer,
    [EStateFeatures.Threads]: threadsReducer,
});

export function logoutClearState(reducer: any) {
    return function (state: any, action: any) {
        if (action.type === '[auth page] auto logout') {
            state = undefined;
        }
        return reducer(state, action);
    };
}
