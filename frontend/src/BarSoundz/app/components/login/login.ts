import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {LoginService} from '../../services/loginService';
import {NotificationService} from '../../services/notificationService';
import {SignalRService} from '../../services/signalrService';

@Component({
    templateUrl: 'app/components/login/login.html'
})
export class LoginComponent {
    private _userName: string;
    private _password: string;

    public _hasError: boolean = false;
    
    constructor(private _router: Router,
                private _loginService: LoginService,
                private _notificationService: NotificationService,
                private _signalRService: SignalRService) {
    }

    public doLogin(): void {
        this._loginService.login(this._userName, this._password)
            .subscribe(
                () => {
                    this._signalRService.start();
                    this.setError(false);
                    this._router.navigate(['Dashboard'])
                },
                () => {
                    this.setError(true);
                    this._notificationService.notifyError('Login was unsuccessful.');
                }
            );
    }

    setError(value: boolean) {
        this._hasError = value;
    }
}
