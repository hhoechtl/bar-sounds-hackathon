import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from '../../services/angular2-jwt';


declare var Auth0Lock;

@Component({
    templateUrl: 'app/components/login/login.html'
})
export class LoginComponent {
    
    lock = new Auth0Lock('p2ZqSpl4T9FKXXFwXsLJ4YeejPxtaS75', '1drop.eu.auth0.com');
    
    constructor(private _router: Router) {
    }

    public login(): void {
        
        var hash = this.lock.parseHash();
        if (hash) {
            if (hash.error) {
                console.log('An error occured during login', hash.error);
            } else {
                this.lock.getProfile(hash.id_token, function(err, profile) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    localStorage.setItem('profile', JSON.stringify(profile));
                    localStorage.setItem('id_token', hash.id_token);
                    this._router.navigate(['Dashboard']);
                });
            }
        }
    }
    
    public logout(): void {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }
    
    public loggedIn() {
        return tokenNotExpired;
    }
}
