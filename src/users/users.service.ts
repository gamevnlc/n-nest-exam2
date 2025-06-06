import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDTO} from "./create-user.dto";
import * as bcrypt from 'bcryptjs';
import {LoginDTO} from "../auth/dto/login.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async create(userDTO: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt(); // 2.
        userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
        const user = await this.usersRepository.save(userDTO); // 4.
        delete (user as any).password; // 5.
        return user; // 6.
    }

    async findOne(data: LoginDTO): Promise<User> {
        const user = await this.usersRepository.findOneBy({ email: data.email });
        if (!user) {
            throw new UnauthorizedException('Could not find user');
        }
        return user;
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id: id });
    }

    async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
        return this.usersRepository.update(
            { id: userId },
            {
                twoFASecret: secret,
                enable2FA: true,
            },
        );
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.usersRepository.update(
            { id: userId },
            {
                enable2FA: false,
                twoFASecret: '',
            },
        );
    }
}
