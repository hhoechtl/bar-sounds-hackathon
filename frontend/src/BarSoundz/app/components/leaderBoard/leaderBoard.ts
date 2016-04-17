import {Component, OnInit} from 'angular2/core';
import {IUser} from '../../models/user';
import {LeaderBoardService} from '../../services/leaderBoardService';

@Component({
    selector: 'leader-board',
    templateUrl: 'app/components/leaderBoard/leaderBoard.html'
})
export class LeaderBoardComponent implements OnInit {
    leaders: IUser[];

    constructor(private _leaderBoardService: LeaderBoardService) {
    }

    ngOnInit() {
        this._leaderBoardService.get().subscribe(
            (leaders) => this.leaders = leaders,
            (err) => console.log('Error getting leader board')
        );
    }
}