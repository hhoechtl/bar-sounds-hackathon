
export interface ILocation {
     id: string;
     latitude: number;
     longitude: number;
     name: string;
     address: string;
     city: string;
     zip: string;
     country: string;
     imageUrl: string;
     location?: any;
     lastTrack?: any;
} 

export class Location implements ILocation {
    public id: string;
    public latitude: number;
    public longitude: number;
    public name: string;
    public address: string;
    public city: string;
    public zip: string;
    public country: string;
    public imageUrl: string;

    constructor(latitude:number, longitude:number, name:string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }
}

export class LocationResult {
    public dist: number;
    public doc: Location;
}