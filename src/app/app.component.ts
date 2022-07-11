import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    subject$ = new Subject();
    interval$ = interval(1000);

    constructor() {
        this.interval$.subscribe(this.subject$);
    }
}
