import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Song} from '../../models/song';
import {SearchTrackService} from '../../services/searchTrackService';

@Component({
    selector: 'enter-track',
    templateUrl: 'app/components/enterTrack/enterTrack.html'
})
export class EnterTrackComponent implements OnInit {
    barId: number;
    songs: Song[];
    title: string;
    artist: string;

    constructor(params: RouteParams, _searchTrackService: SearchTrackService) {
        this.barId = +params.get('id');
    }

    public doSearch(): void {
        this._searchTrackService.get(this.title, this.artist).subscribe(
            (songs) => this.songs = songs,
            (err) => console.log('Error getting songs')
        );
    }
}