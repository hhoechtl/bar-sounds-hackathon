import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {AddTrackBarComponent} from '../addTrackBar/addTrackBar';

@Component({
    selector: 'bar-details',
    directives: [AddTrackBarComponent],
    templateUrl: 'app/components/barDetail/barDetail.html'
})
export class BarDetailComponent {
    barId: number;
    
    
    constructor(params: RouteParams) {
        this.barId = +params.get('id');
    }
}