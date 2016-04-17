import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {AddTrackBarComponent} from '../addTrackBar/addTrackBar';
import {Track} from '../../models/track';
import {TracksService} from '../../services/tracksService';


@Component({
    selector: 'bar-details',
    directives: [AddTrackBarComponent],
    templateUrl: 'app/components/barDetail/barDetail.html'
})
export class BarDetailComponent implements OnInit {
    barId: number;
    tracks: Track[];
    
    
    constructor(params: RouteParams, _tracksService: TracksService) {
        this.barId = +params.get('id');
    }

    ngOnInit() {
        this._tracksService.get(this.barId).subscribe(
            (tracks) => this.tracks = tracks,
            (err) => console.log('Error getting tracks for location with id ' + this.barId)
        );
    }
}