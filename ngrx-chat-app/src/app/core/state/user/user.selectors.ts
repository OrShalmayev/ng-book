import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EStateFeatures } from '../app/app.types';
import { IUsersState } from './user.types';

const state = createFeatureSelector<IUsersState>(EStateFeatures.Users);
const currentUser = createSelector(state, state => state.currentUser);

export const userSelectors = {
    state,
    currentUser,
};
