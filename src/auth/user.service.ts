import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResponseService } from 'src/common/response.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly responseService: ResponseService, // Inject the ResponseService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<{ status: number; message: string; data: User }> {
        const { username, email, password } = createUserDto;

        // Check if a user with the same email or username already exists
        const existingUser = await this.usersRepository.findOne({ where: [{ username }, { email }] });
        if (existingUser) {
            throw new ConflictException('Username or Email already exists');
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = this.usersRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user in the database
        const savedUser = await this.usersRepository.save(newUser);

        // Return success response with the saved user
        return this.responseService.successWithData('Signup successfully', savedUser);
    }

    async findOneByUsernameOrEmail(identifier: string): Promise<User | undefined> {
        if (!identifier) {
            return undefined;
        }

        return this.usersRepository.findOne({
            where: [{ username: identifier }, { email: identifier }],
        });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findOneByUsernameOrEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            return this.responseService.notFound('Invalid credentials', []);
        }
        const payload = { username: user.username, sub: user.id };

        const token = { access_token: jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }), };

        return this.responseService.successWithData('Login successfully', token);
    }
}
