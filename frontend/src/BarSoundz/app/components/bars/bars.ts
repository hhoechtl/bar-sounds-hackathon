import {Component, Output, OnInit, EventEmitter} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {BarsHeaderComponent} from './barsHeader';
import {BarsListComponent} from './barsList';
import {BarsMapComponent} from './barsMap';
import {LocationResult} from '../../models/location';
import {SearchBarService} from '../../services/searchBarService';
import {GeoLocation, GeolocationService} from '../../services/geolocationService';


@Component({
    selector: 'bars',
    directives: [BarsHeaderComponent, BarsListComponent, BarsMapComponent],
    templateUrl: 'app/components/bars/bars.html'
})
export class BarsComponent implements OnInit {
    showMap = false;
    bars: LocationResult[];
    searchString: string;
    
    constructor(params: RouteParams, data: RouteData, private _geolocationService: GeolocationService, private _searchBarService: SearchBarService) {
        this.showMap = data.get('showMap');
    }
    
    public displayMap(): void {
        console.log('show map');
        this.showMap = true;
    }
    
    public hideMap(): void {
        this.showMap = false;
    }

    ngOnInit() {
        this.getBars();
    }

    public getBars(): void {
        this._geolocationService.locate().then(
            (geolocation: GeoLocation) => this._searchBarService.get(geolocation.latitude, geolocation.longitude, this.searchString).subscribe(
                (bars) => this.bars = bars,
                (err) => console.log('Error getting bars')
            ),
            (err) => console.log('Error getting location')
        );
    }
}
