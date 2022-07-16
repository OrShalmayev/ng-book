import { generateUUID } from '@shared/utils';
import { IMessage } from './message.model';

/**
 * Thread represents a group of Users exchanging Messages
 */
export interface IThread {
    id: string;
    name: string | undefined;
    avatarSrc: string | undefined;
    messages: IMessage[];
}

export class Thread implements IThread {
    id: string;
    name: string | undefined;
    avatarSrc: string | undefined;
    messages: IMessage[];

    constructor(id?: string, name?: string, avatarSrc?: string) {
        this.id = id || generateUUID();
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}
