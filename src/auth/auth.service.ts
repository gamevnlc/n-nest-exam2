import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import * as bcrypt from 'bcryptjs';
import {LoginDTO} from "./dto/login.dto";


@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async login(loginDTO: LoginDTO): Promise<User> {
        const user = await this.userService.findOne(loginDTO); // 1.

        const passwordMatched = await bcrypt.compare(
            loginDTO.password,
            user.password,
        ); // 2.

        if (passwordMatched) {
            //3
            delete (user as any).password; // 4
            return user;
        } else {
            throw new UnauthorizedException('Password does not match'); // 5.
        }
    }
}
