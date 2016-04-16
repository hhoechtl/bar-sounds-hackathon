import {Component, OnInit} from 'angular2/core';
import {ProfileService} from '../../services/profileService';
import {User} from '../../models/user';

@Component({
    selector: 'profile',
    templateUrl: 'app/components/profile/profile.html'
})
export class ProfileComponent implements OnInit {
    
    profile: User;
    
    constructor(private _profileService: ProfileService) {
        
    }
    
    ngOnInit() {
        this._profileService.get().subscribe(
            (profile) => this.profile = profile,
            (err) => console.log('Error getting profile')
        );
    }
    
    
}