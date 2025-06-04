import {Injectable, Scope} from '@nestjs/common';

interface Song {
    title: string;
    artist: string;
    duration: number; // in seconds
}

@Injectable()
export class SongsService {
    //local db
    //local array

    private readonly songs: string[] = [];

    create(song: string) {

        this.songs.push(song);
        return this.songs;
    }

    findAll() {
        //error comes while fetching the data from db
        throw new Error("Error in DB while fetching songs");
        return this.songs;
    }


}
