import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  password: string;

  @IsString()
  timestamp: string;
}
