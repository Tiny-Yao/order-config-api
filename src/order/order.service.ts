import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderService {
  async getConfig(): Promise<any> {
    try {
      if (!fs.existsSync(process.env.FILE_CONFIG_ORDER)) {
        return `找不到配置文件${process.env.FILE_CONFIG_ORDER}，您尚未进行相关配置！`;
      } else {
        const config = fs.readFileSync(process.env.FILE_CONFIG_ORDER, 'utf8');
        return JSON.parse(config);
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateConfig(updateConfig: UpdateOrderDto): Promise<string> {
    try {
      if (!fs.existsSync(process.env.FILE_CONFIG_ORDER)) {
        if (!process.env.OKX_SERVER) {
          return '请先设置环境变量OKX_SERVER';
        }
        const users =
          updateConfig.users
            ?.filter(
              (item) => item.api_secret && item.api_key && item.passphrase,
            )
            .map((item) => ({
              apiKey: item.api_key,
              apiSecret: item.api_secret,
              passphrase: item.passphrase,
            })) || [];
        const config = {
          baseUrl: process.env.OKX_SERVER,
          openLeverage: updateConfig.open_lever,
          userIds: [updateConfig.follow],
          ding: {
            webhook: updateConfig.ding_webhook,
            secretKey: updateConfig.ding_secret_key,
          },
          okxData: [
            {
              apiKey: updateConfig.api_key,
              apiSecret: updateConfig.api_secret,
              passphrase: updateConfig.passphrase,
            },
            ...users,
          ],
          okxTrade: {
            apiKey: updateConfig.open_api_key,
            apiSecret: updateConfig.open_api_secret,
            passphrase: updateConfig.open_passphrase,
          },
        };
        fs.writeFileSync(
          process.env.FILE_CONFIG_ORDER,
          JSON.stringify({ ...config }),
          'utf8',
        );
        return '新增配置成功';
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
