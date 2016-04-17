import {Injectable} from 'angular2/core';
import {AuthHttp} from './angular2-jwt';
import {Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppConfiguration} from '../appConfig';
import {User, IUser} from '../models/user';

@Injectable()
export class ProfileService {
    
    public profile: IUser;
    
    constructor (private _authHttp: AuthHttp, private _config: AppConfiguration) {
        
    }
    
    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }
    
    public get(): Observable<User> {
        const url = this.buildUrl('profile');
        return this._authHttp.get(url).map(response => <User>response.json());
    }
    
    public post(profile: IUser): Observable<IUser> {
        const url = this.buildUrl('profile');
                var headers = new Headers();
         headers.append('Content-Type', 'application/json');
        return this._authHttp.post(url, JSON.stringify(profile), {
            headers: headers
        }).map(response => <IUser>response.json());
    }
    
}