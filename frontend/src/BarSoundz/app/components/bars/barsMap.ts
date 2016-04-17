import {Component, Input, Pipe} from 'angular2/core';
import {LocationResult} from '../../models/location';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {GeoLocation} from '../../services/geolocationService';

@Pipe({name: 'round'})
export class RoundPipe {
    transform (input:number) {
        return Math.floor(input);
    }
}

@Component({
    selector: 'bars-map',
    pipes: [RoundPipe],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/components/bars/barsMap.html'
})
export class BarsMapComponent{
    @Input() bars: LocationResult[];
    @Input() location: GeoLocation;

}