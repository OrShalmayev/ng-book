import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '@core/state/app/app.types';
import { threadActions } from '@core/state/thread/thread.actions';
import { threadSelectors } from '@core/state/thread/thread.selectors';
import { userSelectors } from '@core/state/user/user.selectors';
import { IMessage, Message } from '@models/message.model';
import { IThread } from '@models/thread.model';
import { IUser } from '@models/user.model';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components/base-component';
import { combineLatest, debounceTime, delay, forkJoin, Observable, Subject, switchMap, take } from 'rxjs';

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent extends BaseComponent implements OnInit, OnDestroy {
    messages$!: Observable<IMessage[]>;
    currentThread$!: Observable<IThread>;
    draftMessage!: Message;
    currentUser$!: Observable<IUser>;
    sendMessage$ = new Subject<void>();

    constructor(private store: Store<IAppState>, public el: ElementRef) {
        super();
    }

    ngOnInit(): void {
        this.messages$ = this.store.select(threadSelectors.currentThreadMessages);
        /**
         * Now that we have a function that will scroll to the bottom, we have to make sure
        that we call it at the right time. Back in ngOnInit let’s subscribe to the list of
        currentThreadMessages and scroll to the bottom anytime we get a new message
         */
        this.messages$.pipe(this.untilDestroy(), delay(0)).subscribe((messages: Array<Message>) => {
            this.scrollToBottom();
        });

        this.draftMessage = new Message();
        this.currentThread$ = this.store.select(threadSelectors.currentThread);
        this.currentUser$ = this.store.select(userSelectors.currentUser);

        this.sendMessage$
            .pipe(
                this.untilDestroy(),
                switchMap(_ => {
                    return forkJoin({
                        currentUser: this.currentUser$.pipe(take(1)),
                        currentThread: this.currentThread$.pipe(take(1)),
                    });
                })
            )
            .subscribe(({ currentUser, currentThread }) => {
                const m: Message = this.draftMessage;
                m.author = currentUser;
                m.thread = currentThread;
                m.isRead = true;
                this.store.dispatch(threadActions.addMessage(currentThread, m));
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
