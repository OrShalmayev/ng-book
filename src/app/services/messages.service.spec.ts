import { TestBed } from '@angular/core/testing';
import { IMessage, Message } from '@models/message.model';
import { IThread, Thread } from '@models/thread.model';
import { IUser, User } from '@models/user.model';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    it('should test', () => {
        const user: IUser = new User('Nate', '');
        const thread: IThread = new Thread('t1', 'Nate', '');
        const m1: IMessage = new Message({
            author: user,
            text: 'Hi!',
            thread: thread,
        });
        const m2: IMessage = new Message({
            author: user,
            text: 'Bye!',
            thread: thread,
        });

        const messagesService: MessagesService = new MessagesService();

        // listen to each message indivdually as it comes in
        messagesService.newMessages.subscribe((message: IMessage) => {
            console.log('=> newMessages: ' + message.text);
        });

        // listen to the stream of most current messages
        messagesService.messages.subscribe((messages: IMessage[]) => {
            console.log('=> count messages: ' + messages.length);
            console.log('=> messages: ',messages);
        });

        messagesService.addMessage(m1);
        messagesService.addMessage(m2);

        // => messages: 1
        // => newMessages: Hi!
        // => messages: 2
        // => newMessages: Bye!
    });
});
