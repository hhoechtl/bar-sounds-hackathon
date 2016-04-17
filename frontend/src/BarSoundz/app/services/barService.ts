import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {Location} from '../models/location';

@Injectable()
export class BarService {

    constructor (private _http: Http, private _config: AppConfiguration) {

    }

    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public get(id: string): Observable<Location> {
        const url = this.buildUrl('bar/' + id);
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');

        return this._http.get(url).map(response => <Location>response.json());
    }

}