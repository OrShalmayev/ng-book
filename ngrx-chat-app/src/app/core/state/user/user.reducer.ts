import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { IUsersState } from './user.types';

const initialState: IUsersState = {
    currentUser: null,
};

export const usersReducer = createReducer(
    initialState,
    on(
        userActions.setCurrentUser, 
        (state, { user: currentUser }) => ({ ...state, currentUser })
    ),
);
