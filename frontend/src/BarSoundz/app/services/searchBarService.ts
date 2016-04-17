import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {LocationResult} from '../models/location';

@Injectable()
export class SearchBarService {

    constructor (private _http: Http, private _config: AppConfiguration) {

    }

    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public get(latitude: number, longitude: number, searchString: string): Observable<LocationResult[]> {
        const url = this.buildUrl('search/bar');
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');

        return this._http.post(url, JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            searchString: searchString
        }), {
            headers: headers
        }).map(response => <LocationResult[]>response.json());
    }

}