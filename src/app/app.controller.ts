import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';

@Controller('api/ping')
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, ResponseInterceptor)
export class AppController {
  constructor() {}

  @Get()
  ping() {
    return '服务器正常运行中...';
  }
}
