import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RouterHelperService {
    loadingRoute$!: Observable<boolean>;
    constructor(private router: Router) {
        this.loadingRoute$ = this.router.events.pipe(
            map((event: any) => {
                if (event?.route?.data?.preload) {
                    return false;
                }
                if (event instanceof RouteConfigLoadStart) {
                    return true;
                } else if (event instanceof RouteConfigLoadEnd) {
                    return false;
                }
                return false;
            })
        );
    }
}
