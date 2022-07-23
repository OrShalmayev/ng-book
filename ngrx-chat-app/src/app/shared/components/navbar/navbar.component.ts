import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { IAppState } from '@core/state/app/app.types';
import { threadSelectors } from '@core/state/thread/thread.selectors';
import { Store } from '@ngrx/store';

import { NgLetDirective } from '@shared/directives/let.directive';
import _ from 'lodash';
import { combineLatest, map, Observable } from 'rxjs';
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
        private store: Store<IAppState>,
        @Inject(globalConstantsToken) public globalConstants: IGlobalConstants,
    ) {}

    ngOnInit(): void {
        this.initializeUnreadMsgs();
    }

    private initializeUnreadMsgs() {
        this.unreadMessagesCount$ = this.store.select(threadSelectors.unreadMessagesCount);
    }
}
