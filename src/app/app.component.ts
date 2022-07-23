import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAppState } from '@core/state/app/app.types';
import { Store } from '@ngrx/store';
import { ChatExampleData } from './data/chat-example-data';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChatExampleData]
})
export class AppComponent {
    constructor(
        private chatExampleData: ChatExampleData
    ) {
        this.chatExampleData.init()
    }
}
