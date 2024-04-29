import { Module } from '@nestjs/common';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TokenValidationMiddleware } from './common/middleware/token-validation.middleware';
import { GlobalService } from './global/global.service';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';
import { AppController } from './app/app.controller';

@Module({
  imports: [],
  controllers: [UserController, OrderController, BotController, AppController],
  providers: [UserService, GlobalService, OrderService, BotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenValidationMiddleware)
      .exclude('/api/user/login', '/api/ping') // 排除 /login 接口
      .forRoutes('*'); // 对所有路由应用中间件
  }
}
