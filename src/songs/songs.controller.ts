import {
    Body,
    Controller, DefaultValuePipe,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put, Query,
    Scope, UseGuards,
    Request
} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDto} from "./dto/create-song-dto";
import {Song} from "./song.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import {UpdateSongDto} from "./dto/update-song-dto";
import {Pagination} from "nestjs-typeorm-paginate";
import {ArtistJwtGuard} from "../auth/artists-jwt-guard";

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {

    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        });
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number,
    ): Promise<Song | null> {
        return this.songsService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSongDto: UpdateSongDto
    ): Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.remove(id);
    }

    @Post()
    @UseGuards(ArtistJwtGuard)
    create(
        @Body() createSongDto: CreateSongDto,
        @Request() request
    ): Promise<Song> {
        console.log(request.user)
        return this.songsService.create(createSongDto);
    }

}
