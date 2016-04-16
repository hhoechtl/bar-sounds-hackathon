import {Component, Output, OnInit, EventEmitter} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {BarsHeaderComponent} from './barsHeader';
import {BarsListComponent} from './barsList';
import {BarsMapComponent} from './barsMap';



@Component({
    selector: 'bars',
    directives: [BarsHeaderComponent, BarsListComponent, BarsMapComponent],
    templateUrl: 'app/components/bars/bars.html'
})
export class BarsComponent {
    showMap = false;
    
    constructor(params: RouteParams, data: RouteData) {
        this.showMap = data.get('showMap');
    }
    
    public displayMap(): void {
        console.log('show map');
        this.showMap = true;
    }
    
    public hideMap(): void {
        this.showMap = false;
    }
}
