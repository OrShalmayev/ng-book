import { IThreadsState } from "../thread/thread.types";
import { IUsersState } from "../user/user.types";

export enum EStateFeatures {
    Users = 'users',
    Threads = 'threads',
}
export interface IAppState {
    [EStateFeatures.Users]: IUsersState;
    [EStateFeatures.Threads]: IThreadsState;
}