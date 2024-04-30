import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('api/config/order')
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, ResponseInterceptor)
export class OrderController {
  constructor(private readonly userService: OrderService) {}

  @Get()
  async getConfig() {
    try {
      return await this.userService.getConfig();
    } catch (error) {
      throw new HttpException('获取配置失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async updateConfig(@Body() updatedConfig: UpdateOrderDto) {
    try {
      return await this.userService.updateConfig(updatedConfig);
    } catch (error) {
      throw new HttpException('更新配置失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
