import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDto} from "./dto/create-song-dto";

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {

    }
    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get(':id')
    findOne() {
        return "Find One Song ID";
    }

    @Put(':id')
    update() {
        return "Update Song ID";
    }

    @Delete(':id')
    delete() {
        return "Delete Song ID";
    }

    @Post()
    create(@Body() createSongDto: CreateSongDto) {
        return createSongDto;
    }

}
