import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {IUser} from '../models/user';

@Injectable()
export class LeaderBoardService {

    constructor (private _http: Http, private _config: AppConfiguration) {

    }

    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }

    public get(): Observable<IUser[]> {
        const url = this.buildUrl('leaderBoard');
        return this._http.get(url).map(response => <IUser[]>response.json());
    }

}