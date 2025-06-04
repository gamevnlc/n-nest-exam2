import {Injectable} from '@nestjs/common';

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
        return this.songs;
    }


}
