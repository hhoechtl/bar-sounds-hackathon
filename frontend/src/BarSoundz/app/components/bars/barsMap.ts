import {Component, Input} from 'angular2/core';
import {LocationResult} from '../../models/location';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {GeoLocation} from '../../services/geolocationService';

@Component({
    selector: 'bars-map',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    templateUrl: 'app/components/bars/barsMap.html'
})
export class BarsMapComponent{
    @Input() bars: LocationResult[];
    @Input() location: GeoLocation;

}