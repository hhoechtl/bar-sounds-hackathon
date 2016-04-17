import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {AddTrackBarComponent} from '../addTrackBar/addTrackBar';
import {Track} from '../../models/track';
import {ILocation, Location} from '../../models/location';
import {TracksService} from '../../services/tracksService';
import {BarService} from '../../services/barService';


@Component({
    selector: 'bar-details',
    directives: [AddTrackBarComponent],
    templateUrl: 'app/components/barDetail/barDetail.html'
})
export class BarDetailComponent implements OnInit {
    barId: string;
    tracks: Track[];
    bar: ILocation;
    
    
    constructor(params: RouteParams, private _tracksService: TracksService, private _barSerivce: BarService) {
        this.barId = params.get('id');
        this.bar = new Location();
    }

    ngOnInit() {
        this._tracksService.get(this.barId).subscribe(
            (tracks) => this.tracks = tracks,
            (err) => console.log('Error getting tracks for location with id ' + this.barId)
        );
        this._barSerivce.get(this.barId).subscribe(
            (bar) => this.bar = bar,
            (err) => console.log('Error getting location with id ' + this.barId)
        );
    }
}