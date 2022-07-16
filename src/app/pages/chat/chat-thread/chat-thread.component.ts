import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '@models/thread.model';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
    selector: 'chat-thread',
    templateUrl: './chat-thread.component.html',
    styleUrls: ['./chat-thread.component.scss'],
})
export class ChatThreadComponent implements OnInit {
    @Input('thread') thread!: Thread;
    selected = false;
    constructor(public threadsService: ThreadsService) {}

    ngOnInit(): void {
        this.threadsService.currentThread.subscribe((currentThread: Thread) => {
            this.selected = currentThread && this.thread && currentThread.id === this.thread.id;
        });
    }

    clicked(event: any): void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
