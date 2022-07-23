import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAppState } from '@core/state/app/app.types';
import { threadActions } from '@core/state/thread/thread.actions';
import { threadSelectors } from '@core/state/thread/thread.selectors';
import { IThread } from '@models/thread.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatThreadsComponent implements OnInit {
    orderedThreads$!:Observable<IThread[]>;

    constructor(
        private store: Store<IAppState>,
    ) {
    }

    ngOnInit(): void {
        this.orderedThreads$ = this.store.select(threadSelectors.threads);
    }

    trackByThread(thread:any) {
        return thread?.id;
    }
}
