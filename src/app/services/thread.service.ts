import { Injectable } from '@angular/core';
import { IMessage, Message } from '@models/message';
import { IThread, Thread } from '@models/thread';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { MessageService } from './message.service';

export type TEntity<T> = Record<string, T>;
import _ from 'lodash';
@Injectable({
    providedIn: 'root',
})
export class ThreadService {
    // `threads` is a observable that contains the most up to date list of threads
    threads!: Observable<TEntity<IThread>>;
    orderedThreads!: Observable<Thread[]>;
    // `currentThread` contains the currently selected thread
    currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
    // `currentThreadMessages` contains the set of messages for the currently
    // selected thread
    currentThreadMessages: Observable<Message[]>;

    constructor(private messageService: MessageService) {
        this.threads = messageService.messages.pipe(
            map((messages: IMessage[]) => {
                const threads: TEntity<IThread> = {};
                // Store the message's thread in our accumulator `threads`
                messages.map((message: IMessage) => {
                    threads[message.thread.id] = threads[message.thread.id] || message.thread;

                    // Cache the most recent message for each thread
                    const messagesThread: IThread = threads[message.thread.id];
                    if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
                        messagesThread.lastMessage = message;
                    }
                });
                return threads;
            })
        );

        this.orderedThreads = this.threads.pipe(
            map((threadGroups: { [key: string]: Thread }) => {
                const threads: Thread[] = _.values(threadGroups);
                return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
            })
        );


        this.currentThreadMessages = combineLatest(
            [this.currentThread, messageService.messages],
            (currentThread: Thread, messages: Message[]) => {
                if (currentThread && messages.length > 0) {
                    return _.chain(messages)
                        .filter((message: Message) => message.thread.id === currentThread.id)
                        .map((message: Message) => {
                            message.isRead = true;
                            return message;
                        })
                        .value();
                }

                return [];
            }
        );

        this.trackUnreadMessages();
    }

    setCurrentThread(newThread: Thread): void {
        this.currentThread.next(newThread);
    }

    /**
         * We want to keep track of the number of unread messages. If we switch to a new
        Thread then we want to mark all of the Messages in that Thread as read. We have the
        parts we need to do this
         */
    trackUnreadMessages() {
        this.currentThread.subscribe(this.messageService.markThreadAsRead);
    }
}
