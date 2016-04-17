import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {Location} from '../models/location';

@Injectable()
export class SearchBarService {

    constructor (private _http: Http, private _config: AppConfiguration) {

    }

    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public get(latitude: number, longitude: number, searchString: string): Observable<Location[]> {
        const url = this.buildUrl('/search/bar/' + latitude + '/' + longitude + '/' + searchString);
        return this._http.get(url).map(response => <Location[]>response.json());
    }

}