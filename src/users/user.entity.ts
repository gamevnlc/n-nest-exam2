import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Playlist} from "../playlists/playlist.entity";
import {Exclude} from "class-transformer";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique:true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    /**
     * A user can create many playLists
     */
    @OneToMany(() => Playlist, (playList) => playList.user)
    playLists: Playlist[];
}
