import {Component, AfterViewInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {LoginComponent} from './components/login/login';
import {BarsComponent} from './components/bars/bars';
import {BarDetailComponent} from './components/barDetail/barDetail';
import {RecordTrackComponent} from './components/recordTrack/recordTrack';
import {EnterTrackComponent} from './components/enterTrack/enterTrack';
import {HeaderComponent} from './components/header/header';
import {ProfileComponent} from './components/profile/profile';
import {LeaderBoardComponent} from './components/leaderBoard/leaderBoard';

import {SidebarComponent} from './components/sidebar/sidebar';
import {APP_SERVICES} from './services/all';
import {NativeIntegrationService} from "./services/nativeIntegrationService";

@Component({
    selector: 'barsoundz-app',
    providers: APP_SERVICES,
    directives: [ROUTER_DIRECTIVES, SidebarComponent, HeaderComponent],
    templateUrl: 'app/app.html'
})
@RouteConfig([
    { path: '/', component: BarsComponent, name: 'Bars', useAsDefault: true, data: { showMap: false } },
    { path: '/map', component: BarsComponent, name: 'Bars Map', data: { showMap: true } },
    { path: '/login', component: LoginComponent, name: 'Login' },
    { path: '/profile', component: ProfileComponent, name: 'Profile' },
    { path: '/leaderBoard', component: LeaderBoardComponent, name: 'LeaderBoard' },
    { path: '/bar/:id', component: BarDetailComponent, name: 'BarDetail' },
    { path: '/bar/:id/record', component: RecordTrackComponent, name: 'RecordTrack' },
    { path: '/bar/:id/enter', component: EnterTrackComponent, name: 'EnterTrack' }

])
export class BarSoundzAppComponent implements AfterViewInit {
    constructor(
        private _nativeIntegrationService: NativeIntegrationService
    ) {
        _nativeIntegrationService.init();
    }

    ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }
    }
}

interface BarSoundzAppWindow extends Window {
    initAdminLTE(): void;
}

declare var window: BarSoundzAppWindow;
