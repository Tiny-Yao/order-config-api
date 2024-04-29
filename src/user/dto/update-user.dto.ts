import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  old_password: string;

  @IsString()
  new_password: string;
}
