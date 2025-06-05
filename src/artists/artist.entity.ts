import {
    Entity, JoinColumn, ManyToMany, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from "../users/user.entity";
import {Song} from "../songs/song.entity";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists, { onDelete: 'CASCADE' })
    songs: Song[];
}
