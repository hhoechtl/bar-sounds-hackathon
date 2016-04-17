import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {Track} from '../models/track';

@Injectable()
export class SearchTrackService {

    constructor (private _http: Http, private _config: AppConfiguration) {

    }

    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public get(title: string, artist: string): Observable<Track[]> {
        const url = this.buildUrl('/search/track/' + title + '/' + artist);
        return this._http.get(url).map(response => <Track[]>response.json());
    }

}