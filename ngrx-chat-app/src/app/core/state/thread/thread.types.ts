import { IThread } from "@models/thread.model";

export interface IThreadsEntities {
    [id: string]: IThread;
}

export interface IThreadsState {
    ids: string[];
    entities: IThreadsEntities;
    currentThreadId?: string|null;
}