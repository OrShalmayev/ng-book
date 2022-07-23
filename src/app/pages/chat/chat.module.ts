import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { RouterModule } from '@angular/router';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FromNowPipe } from '@shared/pipes/from-now/from-now.pipe';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ChatPageComponent, ChatThreadsComponent, ChatThreadComponent, ChatWindowComponent, ChatMessageComponent, FromNowPipe],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{
            path: '',
            component: ChatPageComponent
        }])
    ],
})
export class ChatModule {}
