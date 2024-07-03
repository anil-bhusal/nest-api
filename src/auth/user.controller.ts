import { Controller, Post, Body, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ status: number; message: string; data: User }>  {
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: { email: string, password: string }) {
        const { email, password } = body;
        const user = await this.userService.login(email, password);
        return user;
    }

}
