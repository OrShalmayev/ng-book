import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ChatPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: ChatPageComponent
        }])
    ],
})
export class ChatModule {}
