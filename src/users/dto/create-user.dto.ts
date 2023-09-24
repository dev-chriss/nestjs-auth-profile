import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty()
  // readonly userId: Types.ObjectId;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
