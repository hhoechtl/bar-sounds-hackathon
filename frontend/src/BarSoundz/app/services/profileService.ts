import {Injectable} from 'angular2/core';
import {AuthHttp} from './angular2-jwt';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {User} from '../models/user';

@Injectable()
export class ProfileService {
    
    constructor (private _authHttp: AuthHttp, private _config: AppConfiguration) {
        
    }
    
    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }
    
    public get(): Observable<User> {
        const url = this.buildUrl('/profile');
        return this._authHttp.get(url).map(response => <User>response.json());
    }
    
}