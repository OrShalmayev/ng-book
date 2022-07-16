import { Injectable } from '@angular/core';
import { IUser } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    user$ = new BehaviorSubject<IUser | null>(null);
    constructor() {}
    setUser(user: IUser) {
        this.user$.next(user);
    }
}
