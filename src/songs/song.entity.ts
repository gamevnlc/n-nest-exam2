import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Artist} from "../artists/artist.entity";
import {Playlist} from "../playlists/playlist.entity";

@Entity('songs')
export class Song {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column('varchar', {array: true})
    // artists: string;

    @Column('date')
    releasedDate: Date;

    @Column('time')
    duration: Date;

    @Column('text')
    lyrics: string;

    @ManyToMany(() => Artist, (artist) => artist.songs, { onDelete: 'CASCADE' })
    @JoinTable({ name: 'songs_artists' })
    artists: Artist[];


    /**
     * Many songs can belong to playlist for each unique user
     */
    @ManyToOne(() => Playlist, (playList) => playList.songs)
    playList: Playlist;
}
