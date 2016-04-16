import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'enter-track',
    templateUrl: 'app/components/enterTrack/enterTrack.html'
})
export class EnterTrackComponent {
    barId: number;
    constructor(params: RouteParams) {
        this.barId = +params.get('id');
    }
}