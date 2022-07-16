import { createReducer, on } from '@ngrx/store';
import { threadActions } from './thread.actions';
import { IThreadsState } from './thread.types';

const initialState: IThreadsState = {
    ids: [],
    currentThreadId: null,
    entities: {},
};

export const threadsReducer = createReducer(
    initialState,
    // ADD THREAD
    on(threadActions.addThread, (state, { thread }) => {
        if (state.ids.includes(thread.id)) {
            return state;
        }

        return {
            ids: [...state.ids, thread.id],
            currentThreadId: state.currentThreadId,
            entities: Object.assign({}, state.entities, {
                [thread.id]: thread,
            }),
        };
    }),
    // ADD MESSAGE
    on(threadActions.addMessage, (state, { thread, message }) => {
        // special case: if the message being added is in the current thread, then
        // mark it as read
        const isRead = message?.thread?.id === state.currentThreadId ? true : message.isRead;
        const newMessage = Object.assign({}, message, { isRead: isRead });

        // grab the old thread from entities
        const oldThread = state.entities[thread.id];

        // create a new thread which has our newMessage
        const newThread = Object.assign({}, oldThread, {
            messages: [...oldThread.messages, newMessage],
        });

        return {
            ids: state.ids, // unchanged
            currentThreadId: state.currentThreadId, // unchanged
            entities: Object.assign({}, state.entities, {
                [thread.id]: newThread,
            }),
        };
    }),
    // SELECT THREAD
    on(threadActions.selectThread, (state, { thread }) => {
        const oldThread = state.entities[thread.id];

        // mark the messages as read
        const newMessages = oldThread.messages.map(message => Object.assign({}, message, { isRead: true }));

        // give them to this new thread
        const newThread = Object.assign({}, oldThread, {
            messages: newMessages,
        });

        return {
            ids: state.ids,
            currentThreadId: thread.id,
            entities: Object.assign({}, state.entities, {
                [thread.id]: newThread,
            }),
        };
    })
); // END createReducer
