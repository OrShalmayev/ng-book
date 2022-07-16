export enum EStateFeatures {
    Users = 'users',
    Threads = 'threads',
}
export interface IAppState {
    [EStateFeatures.Users]: UsersState;
    [EStateFeatures.Threads]: ThreadsState;
}