import { LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CORE_SERVICES } from '@core/services';
import { WINDOW, WINDOW_PROVIDERS } from './services/window.service';
import { NAVIGATOR } from './tokens/navigator.token';
import { AnyObject } from '@shared/utils/type';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { CORE_PROVIDERS } from './providers';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { logoutClearState, rootReducer } from './state/app/app.reducer';
import { environment } from '@environment/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}

const MODULES = [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDateFnsModule,
    HttpClientModule,
    FormsModule,
];
const EXPORTS = [...MODULES];
@NgModule({
    declarations: [],
    imports: [
        ...MODULES,
        StoreModule.forRoot(rootReducer, { metaReducers: [logoutClearState] }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    exports: [...EXPORTS],
    providers: [
        ...WINDOW_PROVIDERS,
        {
            provide: NAVIGATOR,
            useFactory: (window: Window | AnyObject) => window.navigator ?? {},
            deps: [WINDOW],
        },
        ...CORE_SERVICES,
        { provide: HTTP_INTERCEPTORS, useExisting: ApiInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: TitleCasePipe, useClass: TitleCasePipe },
        ...CORE_PROVIDERS,
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
