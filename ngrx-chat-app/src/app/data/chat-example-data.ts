/* tslint:disable:max-line-length */
import { IUser } from '../models/user.model';
import * as moment from 'moment';
import { IAppState } from '@core/state/app/app.types';
import { Store } from '@ngrx/store';
import { userActions } from '@core/state/user/user.actions';
import { generateUUID } from '@shared/utils';
import { threadActions } from '@core/state/thread/thread.actions';
import { getAllMessages } from '@core/state/thread/thread.selectors';
import { switchMap } from 'rxjs';
import { IThread } from '@models/thread.model';
import { Injectable } from '@angular/core';
/**
 * ChatExampleData sets up the initial data for our chats as well as
 * configuring the "bots".
 */

// the person using the app is Juliet
const me: IUser = {
    id: generateUUID(),
    isClient: true, // <-- notice we're specifying the client as this User
    name: 'Juliet',
    avatarSrc: 'assets/images/avatars/female-avatar-1.png',
};

const ladycap: IUser = {
    id: generateUUID(),
    name: 'Lady Capulet',
    avatarSrc: 'assets/images/avatars/female-avatar-2.png',
};

const echo: IUser = {
    id: generateUUID(),
    name: 'Echo Bot',
    avatarSrc: 'assets/images/avatars/male-avatar-1.png',
};

const rev: IUser = {
    id: generateUUID(),
    name: 'Reverse Bot',
    avatarSrc: 'assets/images/avatars/female-avatar-4.png',
};

const wait: IUser = {
    id: generateUUID(),
    name: 'Waiting Bot',
    avatarSrc: 'assets/images/avatars/male-avatar-2.png',
};

const tLadycap: IThread = {
    id: 'tLadycap',
    name: ladycap.name,
    avatarSrc: ladycap.avatarSrc,
    messages: [],
};

const tEcho: IThread = {
    id: 'tEcho',
    name: echo.name,
    avatarSrc: echo.avatarSrc,
    messages: [],
};

const tRev: IThread = {
    id: 'tRev',
    name: rev.name,
    avatarSrc: rev.avatarSrc,
    messages: [],
};

const tWait: IThread = {
    id: 'tWait',
    name: wait.name,
    avatarSrc: wait.avatarSrc,
    messages: [],
};

@Injectable()
export class ChatExampleData {
    constructor(private store: Store<IAppState>) {}
    init() {
        // set the current User
        this.store.dispatch(userActions.setCurrentUser({ user: me }));

        // create a new thread and add messages
        this.store.dispatch(threadActions.addThread({ thread: tLadycap }));
        this.store.dispatch(
            threadActions.addMessage(tLadycap, {
                author: me,
                sentAt: moment().subtract(45, 'minutes').toDate(),
                text: 'Yet let me weep for such a feeling loss.',
                thread: tLadycap,
            })
        );
        this.store.dispatch(
            threadActions.addMessage(tLadycap, {
                author: ladycap,
                sentAt: moment().subtract(20, 'minutes').toDate(),
                text: 'So shall you feel the loss, but not the friend which you weep for.',
                thread: tLadycap,
            })
        );

        // create a few more threads
        this.store.dispatch(threadActions.addThread({ thread: tEcho }));
        this.store.dispatch(
            threadActions.addMessage(tEcho, {
                author: echo,
                sentAt: moment().subtract(1, 'minutes').toDate(),
                text: "I'll echo whatever you send me",
                thread: tEcho,
            })
        );

        this.store.dispatch(threadActions.addThread({ thread: tRev }));
        this.store.dispatch(
            threadActions.addMessage(tRev, {
                author: rev,
                sentAt: moment().subtract(3, 'minutes').toDate(),
                text: "I'll reverse whatever you send me",
                thread: tRev,
            })
        );

        this.store.dispatch(threadActions.addThread({ thread: tWait }));
        this.store.dispatch(
            threadActions.addMessage(tWait, {
                author: wait,
                sentAt: moment().subtract(4, 'minutes').toDate(),
                text: `I\'ll wait however many seconds you send to me before responding.` + ` Try sending '3'`,
                thread: tWait,
            })
        );

        // select the first thread
        this.store.dispatch(threadActions.selectThread({ thread: tLadycap }));

        // Now we set up the "bots". We do this by watching for new messages and
        // depending on which thread the message was sent to, the bot will respond
        // in kind.

        const handledMessages: Record<string, boolean> = {};

        this.store.pipe(switchMap(_ => this.store.select(getAllMessages))).subscribe(allMessages => {
            allMessages
                // bots only respond to messages sent by the user, so
                // only keep messages sent by the current user
                .filter(message => message.author.id === me.id)
                .map(message => {
                    // This is a bit of a hack and we're stretching the limits of a faux
                    // chat app. Every time there is a new message, we only want to keep the
                    // new ones. This is a case where some sort of queue would be a better
                    // model
                    if (!message.id) {
                        return;
                    }
                    if (handledMessages.hasOwnProperty(message.id)) {
                        return;
                    }
                    handledMessages[message.id] = true;

                    switch (message.thread.id) {
                        case tEcho.id:
                            // echo back the same message to the user
                            this.store.dispatch(
                                threadActions.addMessage(tEcho, {
                                    author: echo,
                                    text: message.text,
                                })
                            );

                            break;
                        case tRev.id:
                            // echo back the message reveresed to the user
                            this.store.dispatch(
                                threadActions.addMessage(tRev, {
                                    author: rev,
                                    text: message.text.split('').reverse().join(''),
                                })
                            );

                            break;
                        case tWait.id:
                            let waitTime: number = parseInt(message.text, 10);
                            let reply: string;

                            if (isNaN(waitTime)) {
                                waitTime = 0;
                                reply = `I didn\'t understand ${message}. Try sending me a number`;
                            } else {
                                reply = `I waited ${waitTime} seconds to send you this.`;
                            }

                            setTimeout(() => {
                                this.store.dispatch(
                                    threadActions.addMessage(tWait, {
                                        author: wait,
                                        text: reply,
                                    })
                                );
                            }, waitTime * 1000);

                            break;
                        default:
                            break;
                    }
                });
        });
    }
}
