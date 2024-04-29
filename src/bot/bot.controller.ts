import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';
import { BotService } from './bot.service';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller(`api/config/bot`)
@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, ResponseInterceptor)
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  async getConfig() {
    try {
      return await this.botService.getConfig();
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async updateConfig(@Body() updatedConfig: UpdateBotDto) {
    try {
      return await this.botService.updateConfig(updatedConfig);
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
