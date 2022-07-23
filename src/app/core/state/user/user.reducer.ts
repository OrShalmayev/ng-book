import { IUser } from '@models/user.model';
import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { IUsersState } from './user.types';

const initialState: IUsersState = {
    currentUser: {} as IUser,
};

export const usersReducer = createReducer(
    initialState,
    on(
        userActions.setCurrentUser, 
        (state, { user: currentUser }) => ({ ...state, currentUser })
    ),
);
