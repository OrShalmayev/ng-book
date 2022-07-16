import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Thread } from '@models/thread.model';
import { Observable } from 'rxjs';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatThreadsComponent implements OnInit {
    threads$: Observable<Thread[]>;

    constructor(public threadsService: ThreadsService) {
        this.threads$ = threadsService.orderedThreads;
    }

    ngOnInit(): void {}
}
