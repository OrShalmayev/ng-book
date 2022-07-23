import { IMessage } from '@models/message.model';
import { IThread } from '@models/thread.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EStateFeatures } from '../app/app.types';
import { IThreadsState } from './thread.types';

const state = createFeatureSelector<IThreadsState>(EStateFeatures.Threads);
const entities = createSelector(state, state => state.entities);
const ids = createSelector(state, state => state.ids);
const threads = createSelector(entities, entities => Object.values(entities));
const currentThreadId = createSelector(state, state => state.currentThreadId);
const currentThread = createSelector(entities, currentThreadId, (entities, currentThreadId) => {
    return entities[currentThreadId];
});
const currentThreadMessages = createSelector(currentThread, currentThread => {
    return currentThread.messages;
})
const unreadMessagesCount = createSelector(threads, threads => {
    return threads.reduce((unreadCount, thread) => {
        thread.messages.forEach(msg => {
            if (!msg.isRead) {
                ++unreadCount;
            }
        });

        return unreadCount;
    }, 0);
});
export const getAllMessages = createSelector(threads, threads => {
    return threads
        .reduce(
            // gather all messages
            (messages, thread) => [...messages, ...thread.messages],
            [] as IMessage[]
        )
        .sort((m1, m2) => {
            if (!m1.sentAt || !m2.sentAt) {
                return 0;
            }

            return m1.sentAt.getTime() - m2.sentAt.getTime();
        }); // sort them by time
});
const getLastMessage = (threadId: IThread['id']) => createSelector(threads, threads => threads.find(t => t.id === threadId)?.messages?.at(-1)?.text)
export const threadSelectors = {
    state,
    entities,
    ids,
    threads,
    currentThreadId,
    currentThread,
    currentThreadMessages,
    unreadMessagesCount,
    getAllMessages,
    getLastMessage,
};
