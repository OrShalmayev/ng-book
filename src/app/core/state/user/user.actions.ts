import { IUser } from '@models/user.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EStateFeatures } from '../app/app.types';

export const userActions = createActionGroup({
    source: EStateFeatures.Users,
    events: {
        'Set current user': props<{ user: IUser }>(),
    },
});
