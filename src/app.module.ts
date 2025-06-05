import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SongsModule} from './songs/songs.module';
import {LoggerMiddleware} from "./common/middleware/logger/logger.middleware";
import {SongsController} from "./songs/songs.controller";
import {TypeOrmModule} from "@nestjs/typeorm"
import {DataSource} from "typeorm";
import {Song} from "./songs/song.entity";
import {Artist} from "./artist/artist.entity";
import {User} from "./users/user.entity";
import {Playlist} from "./playlists/playlist.entity";
import {PlayListModule} from "./playlists/playlists.module";
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: 'spotify',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            synchronize: true,
            entities: [Song, Artist, User, Playlist]
        }),
        SongsModule,
        PlayListModule,
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    constructor(private datasource: DataSource) {
        console.log('database', datasource.driver.database);
    }

    configure(consumer: MiddlewareConsumer) {
        // option num 1
        // consumer.apply(LoggerMiddleware).forRoutes('songs');
        // Option num 2
        // consumer.apply(LoggerMiddleware).forRoutes({ path: 'songs', method: RequestMethod.POST });
        // Option num 3
        consumer.apply(LoggerMiddleware).forRoutes(SongsController)
    }

}
