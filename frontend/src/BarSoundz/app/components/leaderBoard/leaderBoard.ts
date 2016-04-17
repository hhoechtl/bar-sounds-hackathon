import {Component, OnInit} from 'angular2/core';
import {User} from '../../models/user';
import {LeaderBoardService} from '../../services/leaderBoardService';

@Component({
    selector: 'leader-board',
    templateUrl: 'app/components/leaderBoard/leaderBoard.html'
})
export class LeaderBoardComponent implements OnInit {
    leaders: User[];

    constructor(_leaderBoardService: LeaderBoardService) {
    }

    ngOnInit() {
        this._leaderBoardService.get().subscribe(
            (leaders) => this.leaders = leaders,
            (err) => console.log('Error getting leader board')
        );
    }
}