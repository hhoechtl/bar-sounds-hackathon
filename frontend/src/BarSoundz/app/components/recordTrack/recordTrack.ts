import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'record-track',
    templateUrl: 'app/components/recordTrack/recordTrack.html'
})
export class RecordTrackComponent {
    barId: number;
    constructor(params: RouteParams) {
        this.barId = +params.get('id');
    }
}