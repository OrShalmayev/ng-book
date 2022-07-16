import { generateUUID } from '@shared/utils';
import { IThread } from './thread.model';
import { IUser } from './user.model';

/**
 * Message represents one message being sent in a Thread
 */
export interface IMessage {
    id?: string;
    sentAt?: Date;
    isRead?: boolean;
    thread?: IThread;
    author: IUser;
    text: string;
}
/**
6 * Message represents one message being sent in a Thread
7 */
export class Message implements IMessage {
    id?: string | undefined;
    sentAt?: Date | undefined;
    isRead?: boolean | undefined;
    thread?: IThread | undefined;
    author: IUser;
    text: string;

    constructor(obj?: any) {
        this.id = (obj && obj.id) || generateUUID();
        this.isRead = (obj && obj.isRead) || false;
        this.sentAt = (obj && obj.sentAt) || new Date();
        this.author = (obj && obj.author) || null;
        this.text = (obj && obj.text) || null;
        this.thread = (obj && obj.thread) || null;
    }

}
