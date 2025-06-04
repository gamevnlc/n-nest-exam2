import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Scope
} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDto} from "./dto/create-song-dto";

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {

    }
    @Get()
    findAll() {
        try {
            return this.songsService.findAll();
        } catch (error) {
            throw new HttpException("server error", HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number,
    ) {
        return `Find One Song ID ${id} with ${typeof id}`;
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
