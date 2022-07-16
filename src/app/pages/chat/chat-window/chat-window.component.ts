import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IMessage, Message } from '@models/message.model';
import { IThread, Thread } from '@models/thread.model';
import { IUser, User } from '@models/user.model';
import { BaseComponent } from '@shared/components/base-component';
import { combineLatest, debounceTime, delay, forkJoin, Observable, Subject, switchMap, take } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent extends BaseComponent implements OnInit, OnDestroy {
    messages!: Observable<IMessage[]>;
    currentThread$!: Observable<IThread>;
    draftMessage!: Message;
    currentUser$!: Observable<IUser>;
    sendMessage$ = new Subject<void>();

    constructor(
        public messagesService: MessagesService,
        public threadsService: ThreadsService,
        public usersService: UsersService,
        public el: ElementRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.messages = this.threadsService.currentThreadMessages;
        /**
         * Now that we have a function that will scroll to the bottom, we have to make sure
        that we call it at the right time. Back in ngOnInit let’s subscribe to the list of
        currentThreadMessages and scroll to the bottom anytime we get a new message
         */
        this.messages.pipe(delay(0)).subscribe((messages: Array<Message>) => {
            this.scrollToBottom();
        });

        this.draftMessage = new Message();
        this.currentThread$ = this.threadsService.currentThread;
        this.currentUser$ = this.usersService.user$;

        /**
     * The sendMessage function above takes the draftMessage, sets the author and thread
        using our component properties. Every message we send has “been read” already (we
        wrote it) so we mark it as read.
        Notice here that we’re not updating the draftMessage text. That’s because we’re
        going to bind the value of the messages text in the view in a few minutes.
        After we’ve updated the draftMessage properties we send it off to the messagesService and then create a new Message and set that new Message to this.draftMessage.
        We do this to make sure we don’t mutate an already sent message
     */
        this.sendMessage$
            .pipe(
                this.untilDestroy(),
                switchMap(_ => {
                    return forkJoin({ 
                        currentUser: this.currentUser$.pipe(take(1)), 
                        currentThread: this.currentThread$.pipe(take(1)) 
                    });
                })
            )
            .subscribe(({ currentUser, currentThread }) => {
                const m: Message = this.draftMessage;
                m.author = currentUser;
                m.thread = currentThread;
                m.isRead = true;
                this.messagesService.addMessage(m);
                this.draftMessage = new Message();
            });
    }

    /**
     * 
     * @param event ChatWindowComponent onEnter
        In our view, we want to send the message in two scenarios
        1. the user hits the “Send” button or
        2. the user hits the Enter (or Return) key
     */
    onEnter(event: Event): void {
        event.preventDefault();
        this.sendMessage$.next();
    }
    /**
     * ChatWindowComponent scrollToBottom
        When we send a message, or when a new message comes in, we want to scroll to the
        bottom of the chat window. To do that, we’re going to set the scrollTop property of
        our host element
     */
    scrollToBottom(): void {
        const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}
