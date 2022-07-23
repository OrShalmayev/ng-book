import { generateUUID } from "@shared/utils";

export interface IUser {
    id: string;
    name: string;
    avatarSrc: string;
    isClient?:boolean;//  the person using the app
}

/**
4 * A User represents an agent that sends messages
5 */
export class User implements IUser {
    public id: string; 
    constructor(public name: string, public avatarSrc: string) {
        this.id = generateUUID();
    }
}
