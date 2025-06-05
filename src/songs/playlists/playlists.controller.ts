import {Body, Controller, Post} from '@nestjs/common';
import {PlayListsService} from "./playlists.service";
import {CreatePlayListDto} from "./dto/create-playlist.dto";
import {Playlist} from "./playlist.entity";

@Controller('playlists')
export class PlayListsController {
    constructor(private playListService: PlayListsService) {}
    @Post()
    create(
        @Body()
        playlistDTO: CreatePlayListDto,
    ): Promise<Playlist> {
        return this.playListService.create(playlistDTO);
    }
}
