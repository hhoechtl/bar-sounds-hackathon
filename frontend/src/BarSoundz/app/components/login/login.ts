import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from '../../services/angular2-jwt';
import {ProfileService} from '../../services/profileService';

declare var Auth0Lock;

@Component({
    templateUrl: 'app/components/login/login.html'
})
export class LoginComponent implements OnInit {

    lock = new Auth0Lock('p2ZqSpl4T9FKXXFwXsLJ4YeejPxtaS75', '1drop.eu.auth0.com');

    constructor(private _router: Router, private _profileService: ProfileService) {
    }

    ngOnInit() {
        if (this.loggedIn()) {
            this._router.navigate(['Profile']);
        }
    }

    public login(): void {
        this.lock.show((err: string, profile: any, id_token: string) => {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            this._profileService.post(profile).subscribe(
                (remoteProfile) => {
                    profile = remoteProfile;
                    localStorage.setItem('profile', JSON.stringify(profile));
                    this._router.navigate(['Profile']);
                },
                (err) => console.log('error updating profile')
            );


        });
    }

    public logout(): void {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    public loggedIn() {
        return tokenNotExpired;
    }
}
