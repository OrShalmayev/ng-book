import { Injectable } from '@angular/core';
import { IUser } from '@models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user$ = new BehaviorSubject<IUser | null>(null);
    constructor() {}
    setUser(user: IUser) {
        this.user$.next(user);
    }
}
