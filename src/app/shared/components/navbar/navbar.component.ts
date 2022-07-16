import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Message } from '@models/message.model';
import { Thread } from '@models/thread.model';

import { NgLetDirective } from '@shared/directives/let.directive';
import _ from 'lodash';
import { combineLatest, map, Observable } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { globalConstantsToken, IGlobalConstants } from 'src/app/settings';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'shared-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetDirective, RouterModule],
})
export class NavbarComponent implements OnInit {
    unreadMessagesCount$!: Observable<number>;

    constructor(
        @Inject(globalConstantsToken) public globalConstants: IGlobalConstants,
        public messagesService: MessagesService,
        public threadsService: ThreadsService
    ) {}
    ngOnInit(): void {
        this.initializeUnreadMsgs();
    }

    private initializeUnreadMsgs() {
        this.unreadMessagesCount$ = combineLatest([this.messagesService.messages, this.threadsService.currentThread])
        .pipe(
            map(([messages, currentThread]) => {
                return _.reduce(
                    messages,
                    (sum, message) => {
                        const messageIsInCurrentThread: boolean =
                            message.thread && currentThread && currentThread.id === message.thread.id;

                        if (message && !message.isRead && !messageIsInCurrentThread) {
                            sum++;
                        }

                        return sum;
                    },
                    0
                );
            })
        );
    }
}
