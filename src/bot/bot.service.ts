import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotService {
  async getConfig(): Promise<any> {
    try {
      if (!fs.existsSync(process.env.FILE_CONFIG_BOT)) {
        return {
          code: 200,
          data: null,
          message: `找不到配置文件${process.env.FILE_CONFIG_BOT}，您尚未进行相关配置！`,
        };
      } else {
        const config = fs.readFileSync(process.env.FILE_CONFIG_BOT, 'utf8');
        return {
          code: 200,
          data: JSON.parse(config),
        };
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateConfig(updatedConfig: UpdateBotDto) {
    try {
      if (!fs.existsSync(process.env.FILE_CONFIG_BOT)) {
        const config = {
          ...updatedConfig,
          allowIps: [
            '52.89.214.238',
            '34.212.75.30',
            '54.218.53.128',
            '52.32.178.7',
          ],
        };
        fs.writeFileSync(
          process.env.FILE_CONFIG_BOT,
          JSON.stringify({ ...config }),
          'utf8',
        );
        return {
          code: 200,
          data: true,
          message: '初始化配置成功',
        };
      } else {
        const config = JSON.parse(
          fs.readFileSync(process.env.FILE_CONFIG_BOT, 'utf8'),
        );
        fs.writeFileSync(
          process.env.FILE_CONFIG_BOT,
          JSON.stringify({ ...config, ...updatedConfig }),
          'utf8',
        );
        return {
          code: 200,
          data: true,
          message: '更新配置成功',
        };
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
