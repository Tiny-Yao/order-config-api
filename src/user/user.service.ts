import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import { GlobalService } from '../global/global.service';

@Injectable()
export class UserService {
  constructor(private readonly globalService: GlobalService) {}

  async login(loginUser: LoginUserDto) {
    // console.log('用户登录service:', loginUser);
    const { password, timestamp } = loginUser;
    try {
      if (!process.env.FILE_PASSWORD) {
        return '[login]密码文件不存在，请检查';
      }
      const storedPassword = fs
        .readFileSync(process.env.FILE_PASSWORD, 'utf8')
        .trim();
      // console.log('storedPassword:', storedPassword);
      const hashedPassword = this.globalService.encryptPassword(
        this.globalService.decrypt(password),
      );
      // console.log('hashedPassword:', hashedPassword);
      if (storedPassword !== hashedPassword) {
        return '密码错误';
      } else {
        return this.globalService.generateToken(password, timestamp);
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reset(updateUser: UpdateUserDto) {
    const { old_password, new_password } = updateUser;
    try {
      if (!process.env.FILE_PASSWORD) {
        return '[reset]密码文件不存在，请检查';
      }
      const storedPassword = fs
        .readFileSync(process.env.FILE_PASSWORD, 'utf8')
        .trim();
      const oldHashedPassword = this.globalService.encryptPassword(
        this.globalService.decrypt(old_password),
      );
      const newHashedPassword = this.globalService.encryptPassword(
        this.globalService.decrypt(new_password),
      );
      if (storedPassword !== oldHashedPassword) {
        return '旧密码错误';
      } else {
        try {
          fs.writeFileSync(
            process.env.FILE_PASSWORD,
            newHashedPassword,
            'utf8',
          );
          return '密码修改成功';
        } catch (error) {
          throw new HttpException(
            '服务器内部错误',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
