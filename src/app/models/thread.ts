import { generateUUID } from "@shared/utils";
import { IMessage } from "./message";

export interface IThread {
    id: string;
    lastMessage: IMessage;
    name: string|undefined;
    avatarSrc: string|undefined;
}

export class Thread implements IThread {
    id: string;
    lastMessage: any;
    name: string | undefined;
    avatarSrc: string | undefined;

    constructor(id?: string, name?: string, avatarSrc?: string) {
        this.id = id || generateUUID();
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}
