import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderService {
  async getConfig(): Promise<any> {
    try {
      if (!fs.existsSync(process.env.FILE_CONFIG_ORDER)) {
        return {
          code: 200,
          data: null,
          message: `找不到配置文件${process.env.FILE_CONFIG_ORDER}，您尚未进行相关配置！`,
        };
      } else {
        const data = fs.readFileSync(process.env.FILE_CONFIG_ORDER, 'utf8');
        const config = JSON.parse(data);
        if (!config) {
          return {
            code: 200,
            data: null,
            message: `文件${process.env.FILE_CONFIG_ORDER}配置为空，您尚未进行相关配置！`,
          };
        }
        const result = {
          follow: config.userIds?.[0] || '',
          open_lever: config.openLeverage || 0,
          ding_webhook: config.ding?.webhook || '',
          ding_secret_key: config.ding?.secretKey || '',
          api_key: config.okxData?.[0]?.apiKey || '',
          api_secret: config.okxData?.[0]?.apiSecret || '',
          passphrase: config.okxData?.[0]?.passphrase || '',
          open_api_key: config.okxTrade?.apiKey || '',
          open_api_secret: config.okxTrade?.apiSecret || '',
          open_passphrase: config.okxTrade?.passphrase || '',
          users:
            config.okxData?.slice(1).map((item) => ({
              api_key: item.apiKey,
              api_secret: item.apiSecret,
              passphrase: item.passphrase,
            })) || [],
        };
        return {
          code: 200,
          data: result,
          message: '获取配置成功',
        };
      }
    } catch (error) {
      throw new HttpException(
        '服务器内部错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateConfig(updateConfig: UpdateOrderDto): Promise<any> {
    try {
      const users =
        updateConfig.users
          ?.filter((item) => item.api_secret && item.api_key && item.passphrase)
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
      if (!fs.existsSync(process.env.FILE_CONFIG_ORDER)) {
        if (!process.env.OKX_SERVER) {
          return {
            code: 200,
            data: null,
            message: '请先设置环境变量OKX_SERVER',
          };
        }
        fs.writeFileSync(
          process.env.FILE_CONFIG_ORDER,
          JSON.stringify({ ...config }),
          'utf8',
        );
        return {
          code: 200,
          data: true,
          message: '初始化配置成功',
        };
      } else {
        const oldConfig = JSON.parse(
          fs.readFileSync(process.env.FILE_CONFIG_ORDER, 'utf8'),
        );
        fs.writeFileSync(
          process.env.FILE_CONFIG_ORDER,
          JSON.stringify({ ...oldConfig, ...config }),
          'utf8',
        );
        return {
          code: 200,
          data: true,
          message: '修改配置成功',
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
