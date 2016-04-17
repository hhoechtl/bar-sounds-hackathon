import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Song} from '../../models/song';
import {EnterTrackService} from '../../services/enterTrackService';

@Component({
    selector: 'enter-track',
    templateUrl: 'app/components/enterTrack/enterTrack.html'
})
export class EnterTrackComponent {
    barId: string;
    songs: Song[];
    title: string;
    artist: string;

    constructor(params: RouteParams, private _enterTrackService: EnterTrackService) {
        this.barId = params.get('id');
    }

    public onSubmit(): void {
        var trackDto = {
          title: this.title,
          artist: this.artist  
        };
        this._enterTrackService.post(this.barId, trackDto).subscribe(
            (anyThing) => {
                this.title = '';
                this.artist = '';
            },
            (err) => console.log('Error posting song')
        );
    }
    
}