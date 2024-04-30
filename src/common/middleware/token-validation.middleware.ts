import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const token = headers['token'];

    // 检查请求是否包含 Token
    if (!token) {
      throw new UnauthorizedException('未提供 token');
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new UnauthorizedException('未设置JWT_SECRET_KEY');
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);

      // 验证成功，继续处理请求
      next();
    } catch (error) {
      throw new UnauthorizedException('token 无效');
    }
  }
}
