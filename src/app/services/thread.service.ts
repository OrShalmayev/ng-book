import { Injectable } from '@angular/core';
import { IMessage } from '@models/message';
import { IThread, Thread } from '@models/thread';
import { map, Observable } from 'rxjs';
import { MessageService } from './message.service';

export type TEntity<T> = Record<string, T>;

@Injectable({
    providedIn: 'root',
})
export class ThreadService {
    // `threads` is a observable that contains the most up to date list of threads
    threads!: Observable<TEntity<IThread>>;
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
    }
}
