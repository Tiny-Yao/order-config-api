import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';

@Controller('api')
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, ResponseInterceptor)
export class AppController {
  constructor() {}

  @Get('ping')
  ping() {
    return {
      data: true,
      message: '服务器连接成功',
    };
  }
}
