// create-user.dto.ts
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 20) // Example: Minimum length of 6 characters, maximum of 20
    password: string;
}
