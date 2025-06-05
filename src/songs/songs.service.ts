import {Injectable, Scope} from '@nestjs/common';
import {DeleteResult, In, Repository, UpdateResult} from "typeorm";
import {Song} from "./song.entity";
import {CreateSongDto} from "./dto/create-song-dto";
import {InjectRepository} from '@nestjs/typeorm';
import {UpdateSongDto} from "./dto/update-song-dto";
import {IPaginationOptions, Pagination, paginate} from "nestjs-typeorm-paginate";
import {Artist} from "../artists/artist.entity";

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    ) {
    }

    async create(songDTO: CreateSongDto): Promise<Song> {

        const song = new Song();
        song.title = songDTO.title;
        song.duration = songDTO.duration
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;
        //find all the artists on the base on the ids  and set the relation

        const artists = await this.artistRepository.find({
            where: {
                id: In(songDTO.artists),
            },
        });

        song.artists = artists;

        return this.songRepository.save(song);
    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }

    findOne(id: number): Promise<Song | null> {
        return this.songRepository.findOneBy({id})
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songRepository.delete(id);
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepository.update(id, recordToUpdate);
    }


    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');

        return paginate<Song>(queryBuilder, options);
    }


}
