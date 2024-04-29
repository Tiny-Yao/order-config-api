import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsString()
  api_key: string;

  @IsString()
  api_secret: string;

  @IsString()
  passphrase: string;
}

export class UpdateOrderDto {
  /**
   * 开仓杠杆
   */
  @IsNumber()
  open_lever: number;

  /**
   * 跟单用户
   */
  @IsString()
  follow: string;

  /**
   * 钉钉配置
   */
  @IsString()
  ding_webhook: string;

  /**
   * 钉钉密钥
   */
  @IsString()
  ding_secret_key: string;

  /**
   * okx获取数据配置
   */
  @IsString()
  api_key: string;

  /**
   * okx获取数据配置
   */
  @IsString()
  api_secret: string;

  /**
   * okx获取数据配置
   */
  @IsString()
  passphrase: string;

  /**
   * okx获取数据配置-更多用户
   */
  @IsOptional()
  // @ValidateNested({ each: true }) // 验证嵌套对象数组的每个元素
  @Type(() => User) // 使用 class-transformer 的 Type 转换器处理嵌套对象数组
  users: User[];

  /**
   * okx开仓账户配置
   */
  @IsString()
  open_api_key: string;

  /**
   * okx开仓账户配置
   */
  @IsString()
  open_api_secret: string;

  /**
   * okx开仓账户配置
   */
  @IsString()
  open_passphrase: string;
}
