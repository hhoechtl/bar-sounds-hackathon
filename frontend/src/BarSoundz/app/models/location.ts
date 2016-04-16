
export class Location {
    public id: string = null;
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