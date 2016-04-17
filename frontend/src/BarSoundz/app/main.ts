// require all 3rd party libs
import 'jquery';
import 'bootstrap/js/bootstrap';
import 'admin-lte/js/app';
import 'hammerjs/hammer';
import 'jquery/jquery.hammer';
import 'jquery/jquery.slimscroll';
import 'pNotify/pnotify-adapter';
import 'signalr/signalr';
import 'leaflet/leaflet';
import 'fastclick/fastclick';

///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthConfig, AuthHttp, JwtHelper, tokenNotExpired} from  './services/angular2-jwt';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import {BarSoundzAppComponent} from './app';
import {appInjector} from './services/appInjector';
import 'rxjs/Rx';

enableProdMode();

bootstrap(BarSoundzAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(AuthConfig, {
        useValue: new AuthConfig()
    }),
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    }),
    ANGULAR2_GOOGLE_MAPS_PROVIDERS
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector workaround for Dependency Injection in Router lifecycle hook
    appInjector(appRef.injector);
});
