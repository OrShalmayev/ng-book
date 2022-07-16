import { IMessage } from '@models/message.model';
import { IThread } from '@models/thread.model';
import { createActionGroup, props } from '@ngrx/store';
import { generateUUID } from '@shared/utils';
import { EStateFeatures } from '../app/app.types';

export const threadActions = createActionGroup({
    source: EStateFeatures.Threads,
    events: {
        'Add Thread': props<{ thread: IThread }>(),
        'Add Message': (thread: IThread, message: IMessage) => {
            const defaults = {
                id: generateUUID(),
                sentAt: new Date(),
                isRead: false,
                thread: thread,
            };
            const messageWithDefaults: IMessage = {...defaults, ...message};

            return {
                thread: thread,
                message: messageWithDefaults,
            };
        },
        'Select Thread': props<{thread: IThread}>()
    },
});
