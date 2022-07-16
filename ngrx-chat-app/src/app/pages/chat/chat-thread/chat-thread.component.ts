import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Thread } from '@models/thread.model';
import { BaseComponent } from '@shared/components/base-component';
import { map, Observable } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
    selector: 'chat-thread',
    templateUrl: './chat-thread.component.html',
    styleUrls: ['./chat-thread.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatThreadComponent extends BaseComponent implements OnInit {
    @Input('thread') thread!: Thread;
    selected$!: Observable<boolean>;

    constructor(
        public threadsService: ThreadsService,
        private messagesService: MessagesService,
        private cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {
        this.messagesService.newMessages.pipe(
            this.untilDestroy(),
        ).subscribe(message => {
            const newMessageIsForCurrentThread = message.thread.id === this.thread.id;
            if (newMessageIsForCurrentThread) {
                this.cd.detectChanges();
            }
        });

        this.selected$ = this.threadsService.currentThread
        .pipe(
            this.untilDestroy(),
            map(currentThread => {
                return currentThread && this.thread && currentThread.id === this.thread.id;
            })
        )
    }

    clicked(event: any): void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
