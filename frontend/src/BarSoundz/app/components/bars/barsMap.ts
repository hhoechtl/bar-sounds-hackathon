import {Component, Input, OnInit} from 'angular2/core';
import {LocationResult} from '../../models/location';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {GeoLocation, GeolocationService} from '../../services/geolocationService';

@Component({
    selector: 'bars-map',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    templateUrl: 'app/components/bars/barsMap.html'
})
export class BarsMapComponent implements OnInit{
    geolocation: GeoLocation;
    @Input() bars: LocationResult[];

    constructor(private _geolocationService: GeolocationService) {
    }

    ngOnInit() {
        this._geolocationService.locate().then(
            (geolocation: GeoLocation) => this.geolocation = geolocation,
            (err) => console.log('Error getting location')
        );
    }
}