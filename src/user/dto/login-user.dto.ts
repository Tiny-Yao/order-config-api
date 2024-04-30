import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  password: string;

  @IsNumber()
  timestamp: number;
}
