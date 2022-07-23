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

