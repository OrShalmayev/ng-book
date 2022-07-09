import { generateUUID } from '@shared/utils';
import { IThread } from './thread';
import { IUser } from './user';

export interface IMessage {
    id: string;
    sentAt: Date;
    isRead: boolean;
    author: IUser;
    text: string;
    thread: IThread;
}
/**
6 * Message represents one message being sent in a Thread
7 */
export class Message implements IMessage {
    id: string;
    sentAt: Date;
    isRead: boolean;
    author: IUser;
    text: string;
    thread: IThread;

    constructor(obj?: any) {
        this.id = (obj && obj.id) || generateUUID();
        this.isRead = (obj && obj.isRead) || false;
        this.sentAt = (obj && obj.sentAt) || new Date();
        this.author = (obj && obj.author) || null;
        this.text = (obj && obj.text) || null;
        this.thread = (obj && obj.thread) || null;
    }
}
