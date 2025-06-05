import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import * as bcrypt from 'bcryptjs';
import {LoginDTO} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDTO); // 1.

        const passwordMatched = await bcrypt.compare(
            loginDTO.password,
            user.password,
        ); // 2.

        if (passwordMatched) {
            const payload = { email: user.email, sub: user.id };

            return {
                accessToken: this.jwtService.sign(payload),
            };
        } else {
            throw new UnauthorizedException('Password does not match'); // 5.
        }
    }
}
