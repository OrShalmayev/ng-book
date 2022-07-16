import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';
import { MessagesService } from './services/messages.service';
import { ThreadsService } from './services/threads.service';
import { UsersService } from './services/users.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        public messagesService: MessagesService,
        public threadsService: ThreadsService,
        public usersService: UsersService,
    ) {
        ChatExampleData.init(messagesService, threadsService, usersService);
    }
}
