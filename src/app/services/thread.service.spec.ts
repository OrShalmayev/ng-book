import { TestBed } from '@angular/core/testing';
import { Message } from '@models/message';
import { IThread, Thread } from '@models/thread';
import { IUser, User } from '@models/user';
import { MessageService } from './message.service';

import { ThreadService } from './thread.service';
import _ from 'lodash';
describe('ThreadService', () => {
    let service: ThreadService;
    let messageService: MessageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThreadService);
        messageService = TestBed.inject(MessageService);
    });

    it('services should be created', () => {
        expect(service).toBeTruthy();
        expect(messageService).toBeTruthy();
    });

    it('should collect the Threads from Messages', () => {
        const nate: IUser = new User('Nate Murray', '');
        const felipe: IUser = new User('Felipe Coury', '');

        const t1: IThread = new Thread('t1', 'Thread 1', '');
        const t2: IThread = new Thread('t2', 'Thread 2', '');
        
        const m1: Message = new Message({
            author: nate,
            text: 'Hi!',
            thread: t1,
        });

        const m2: Message = new Message({
            author: felipe,
            text: 'Where did you get that hat?',
            thread: t1,
        });

        const m3: Message = new Message({
            author: nate,
            text: 'Did you bring the briefcase?',
            thread: t2,
        });

        service.threads.subscribe((threadIdx: { [key: string]: Thread }) => {
            //conver obkect to array of valus
            const threads: Thread[] = _.values(threadIdx);
            const threadNames: string = _.map(threads, (t: Thread) => t.name).join(', ');
            console.log(`=> threads (${threads.length}): ${threadNames} `);
        });

        messageService.addMessage(m1);
        messageService.addMessage(m2);
        messageService.addMessage(m3);
    });
});
