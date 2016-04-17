import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'add-track-bar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/addTrackBar/addTrackBar.html'
})
export class AddTrackBarComponent {
    @Input() barId: number;
}