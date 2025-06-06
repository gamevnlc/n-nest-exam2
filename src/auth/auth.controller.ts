import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import {CreateUserDTO} from "../users/create-user.dto";
import {LoginDTO} from "./dto/login.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-guard";
import { Enable2FAType } from './types';
import {ValidateTokenDTO} from "./dto/validate-token.dto";
import {UpdateResult} from "typeorm";

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}
    @Post('signup')
    signup(
        @Body()
        userDTO: CreateUserDTO,
    ): Promise<User> {
        return this.userService.create(userDTO);
    }

    @Post('login')
    login(
        @Body()
        loginDTO: LoginDTO,
    ) {
        return this.authService.login(loginDTO);
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @Request()
        req,
    ): Promise<Enable2FAType> {
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(
        @Request()
        req,
        @Body()
        ValidateTokenDTO: ValidateTokenDTO,
    ): Promise<{ verified: boolean }> {
        return this.authService.validate2FAToken(
            req.user.userId,
            ValidateTokenDTO.token,
        );
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @Request()
        req,
    ): Promise<UpdateResult> {
        return this.authService.disable2FA(req.user.userId);
    }
}
