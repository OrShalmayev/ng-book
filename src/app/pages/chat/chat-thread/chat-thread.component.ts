import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Thread } from '@models/thread.model';
import { map, Observable } from 'rxjs';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
    selector: 'chat-thread',
    templateUrl: './chat-thread.component.html',
    styleUrls: ['./chat-thread.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatThreadComponent implements OnInit {
    @Input('thread') thread!: Thread;
    selected$!: Observable<boolean>;
    constructor(public threadsService: ThreadsService) {}

    ngOnInit(): void {
        this.selected$ = this.threadsService.currentThread
        .pipe(
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
