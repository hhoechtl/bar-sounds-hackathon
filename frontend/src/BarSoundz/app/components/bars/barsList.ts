import {Component, Input, Pipe} from 'angular2/core';
import {LocationResult} from '../../models/location';

@Pipe({name: 'round'})
export class RoundPipe {
    transform (input:number) {
        return Math.floor(input);
    }
}

@Component({
    selector: 'bars-list',
    pipes: [RoundPipe],
    templateUrl: 'app/components/bars/barsList.html'
})
export class BarsListComponent {
    @Input() bars: LocationResult[];
}