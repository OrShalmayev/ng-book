import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
