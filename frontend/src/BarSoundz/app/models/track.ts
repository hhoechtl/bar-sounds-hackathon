
import Location from './location';

export class Track {
    public id: string = null;
    public title: string;
    public artist: string;
    public location: Location;
    public begin: Date;

    constructor(title:string, artist:string, location:Location, begin:Date) {
        this.title = title;
        this.artist = artist;
        this.location = location;
        this.begin = begin;
    }
}
