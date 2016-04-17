import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {CloseSidebarOnClickDirective} from '../../directives/closeSidebarOnClickDirective';
import {NavigationEntry} from "../../models/navigationEntry";
import {IUser} from "../../models/user";
import {JwtHelper} from '../../services/angular2-jwt';


@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES, CloseSidebarOnClickDirective],
    templateUrl: 'app/components/sidebar/sidebar.html'
})
export class SidebarComponent {
    public expanded: boolean = true;
    public navigationEntries: Array<NavigationEntry>;
    private profile: IUser;
    private loggedIn: boolean;

    constructor() {
        this.navigationEntries = [];
        this.navigationEntries.push(new NavigationEntry(['Bars', 'BarDetail'], 'bars', 'Bars'));
        this.navigationEntries.push(new NavigationEntry(['Profile'], 'profile', 'Profile'));
        this.navigationEntries.push(new NavigationEntry(['LeaderBoard'], 'leaderBoard', 'LeaderBoard'));
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.loggedIn = JwtHelper.tokenNotExpired();
        if (!this.profile) {
            this.loggedIn = false;
        }
    }

    toggleSidebar(): void {
        this.expanded = !this.expanded;
    }
}
