import { Component, Input, OnInit } from '@angular/core';
import { Message } from '@models/message.model';
import { User } from '@models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
    @Input('message') message!: Message;
    currentUser!: User;
    incoming!: boolean;

    constructor(public usersService: UsersService) {}

    ngOnInit(): void {
        this.usersService.user$.subscribe((user: User) => {
            this.currentUser = user;
            if (this.message.author && user) {
                this.incoming = this.message.author.id !== user.id;
            }
        });
    }
}
