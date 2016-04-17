import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {Location} from '../models/location';
import {ITrackDto} from '../models/track';

@Injectable()
export class EnterTrackService {


    constructor(private _http: Http, private _config: AppConfiguration) {
         
    }

    private buildUrl(appendix: string): string {
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public post(barId: string, track: ITrackDto): Observable<ITrackDto> {
        var userId = JSON.parse(localStorage.getItem('profile')).global_client_id;
        const url = this.buildUrl('enter/' + barId + '/' + userId);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(url, JSON.stringify(track), { headers: headers }).map(response => <ITrackDto>response.json());
    }

}