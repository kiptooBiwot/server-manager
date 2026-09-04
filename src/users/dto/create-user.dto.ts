import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty()
  @IsString()
  email!: string;
}
