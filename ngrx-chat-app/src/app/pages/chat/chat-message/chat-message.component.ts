import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAppState } from '@core/state/app/app.types';
import { userSelectors } from '@core/state/user/user.selectors';
import { Message } from '@models/message.model';
import { IUser } from '@models/user.model';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements OnInit {
    @Input('message') message!: Message;
    incoming$!: Observable<boolean>;

    constructor(private store:Store<IAppState>) {}

    ngOnInit(): void {
        this.incoming$ = this.store.select(userSelectors.currentUser)
            .pipe(
                map(currentUser => {
                    return Boolean(this.message.author.id !== currentUser.id);
                })
            )
    }
}
