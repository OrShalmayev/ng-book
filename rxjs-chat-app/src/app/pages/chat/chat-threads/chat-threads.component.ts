import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IThread, Thread } from '@models/thread.model';
import { Observable } from 'rxjs';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatThreadsComponent implements OnInit {
    orderedThreads$!:Observable<IThread[]>;

    constructor(
        public threadsService: ThreadsService,
    ) {
    }

    ngOnInit(): void {
        this.orderedThreads$ = this.threadsService.orderedThreads;
        this.orderedThreads$.subscribe(console.log)
    }

    trackByThread(thread:any) {
        return thread?.id;
    }
}
