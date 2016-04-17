import {Component, OnInit} from 'angular2/core';
import {ProfileService} from '../../services/profileService';
import {User} from '../../models/user';
import {CanActivate} from 'angular2/router';
import {JwtHelper} from '../../services/angular2-jwt';

@Component({
    selector: 'profile',
    templateUrl: 'app/components/profile/profile.html'
})
@CanActivate(() => JwtHelper.tokenNotExpired())
export class ProfileComponent implements OnInit {
    
    profile: User;
    
    constructor(private _profileService: ProfileService) {
        
    }
    
    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
}