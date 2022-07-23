import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAppState } from '@core/state/app/app.types';
import { threadActions } from '@core/state/thread/thread.actions';
import { threadSelectors } from '@core/state/thread/thread.selectors';
import { IThread } from '@models/thread.model';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components/base-component';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'chat-thread',
    templateUrl: './chat-thread.component.html',
    styleUrls: ['./chat-thread.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatThreadComponent extends BaseComponent implements OnInit {
    @Input('thread') thread!: IThread;
    selected$!: Observable<boolean>;

    constructor(
        private store: Store<IAppState>,
    ) {
        super();
    }

    ngOnInit(): void {
        this.selected$ = this.store.select(threadSelectors.currentThread)
        .pipe(
            map(currentThread => {
                return Boolean(currentThread && this.thread && currentThread.id === this.thread.id);
            })
        )
    }

    selectThread(event: Event): void {
        event.preventDefault();
        this.store.dispatch(threadActions.selectThread({thread: this.thread}))
    }
}
