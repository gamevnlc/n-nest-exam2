import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from 'src/users/users.module';
import {JwtModule} from "@nestjs/jwt";
import { register } from 'module';
import {authConstants} from "./auth.constants";
import {JwtStrategy} from "./jwt-strategy";
import {ArtistsModule} from "../artists/artists.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: authConstants.secret,
            signOptions: {
                expiresIn: '1d',
            },
        }),
        ArtistsModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}
