import { Injectable } from '@angular/core';
import { IUser, User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    user$ = new BehaviorSubject<IUser>({} as IUser);
    constructor() {}
    setUser(user: IUser) {
        this.user$.next(user);
    }
}
