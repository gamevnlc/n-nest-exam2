import {Module} from '@nestjs/common';
import {SongsController} from './songs.controller';
import {SongsService} from './songs.service';


const mockSongService = {
    findAll() {
        return []
    }
}

@Module({
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
