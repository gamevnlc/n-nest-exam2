import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import {LoggerMiddleware} from "./common/middleware/logger/logger.middleware";

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // option num 1
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    // Option num 2
    consumer.apply(LoggerMiddleware).forRoutes({ path: 'songs', method: RequestMethod.POST });
  }
}
