import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'header',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent {
    
}