import { Controller, Header, UseInterceptors } from '@nestjs/common';
import { Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    try {
      return await this.userService.login(loginUser);
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset')
  async reset(@Body() updateUser: UpdateUserDto) {
    try {
      return await this.userService.reset(updateUser);
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
