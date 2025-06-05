import {Module} from '@nestjs/common';
import {SongsController} from './songs.controller';
import {SongsService} from './songs.service';
import {Song} from "./song.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Artist} from "../artist/artist.entity";


const mockSongService = {
    findAll() {
        return []
    }
}

@Module({
    imports: [
        TypeOrmModule.forFeature([Song, Artist])
    ],
    controllers: [SongsController],
    providers: [
        //standard provider
        SongsService
        // {
        //   provide: SongsService,
        //   useClass: SongsService,
        // }
        // value provider for testing purpose
        // {
        //   provide: SongsService,
        //   useValue: mockSongService
        // }
    ]
})
export class SongsModule {
}
