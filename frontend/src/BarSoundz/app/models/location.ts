export class Location {
    public latitude: number;
    public longitude: number;
    public title: string;
    public address: string;
    public city: string;
    public zip: string;
    public country: string;
    

    constructor(latitude:number, longitude:number, title:string){
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
    }
}