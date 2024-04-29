import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBotDto {
  /**
   * binance的api_key
   */
  @IsString()
  api_key: string;

  /**
   * binance的api_secret
   */
  @IsString()
  api_secret: string;

  /**
   * 交易类型 spot-现货 usdm-U本位合约 coinm-币本位合约
   */
  @IsString()
  exchange_type: string;

  /**
   * 交易对 BTC/USDT或者EH/USDT
   */
  @IsString()
  symbol: string;

  /**
   * 对接类型 strategy-智能策略对接 indicator-手动指标对接
   */
  @IsString()
  docking_type: string;

  /**
   * 方向 long-开多 short-开空 both-平仓
   */
  @IsOptional()
  @IsString()
  direction: string;

  /**
   * 保证金模式 run-逐仓 all-全仓
   */
  @IsString()
  earnest_money_mode: string;

  /**
   * 杠杆倍数
   */
  @IsNumber()
  leverage: number;

  /**
   * 订单类型  limit-限价 market-市价 both-限价开仓 + 市价平仓
   */
  @IsString()
  order_type: string;

  /**
   * 交易单位 usdt-USDT数量 coin-币数量 percent-资金量
   */
  @IsString()
  exchange_unit: string;

  /**
   * 数量
   */
  @IsNumber()
  quantity: number;

  /**
   * 委托价
   */
  @IsNumber()
  entrust_price: number;

  /**
   * 止盈止损 null-不设置 move-移动止盈止损 normal-固定止盈止损
   */
  @IsString()
  stop_profit_or_loss: string;

  /**
   * 追踪止损回调比例
   */
  @IsOptional()
  @IsNumber()
  scale: number;

  /**
   * 止盈止损订单类型 market-市价 limit-限价
   */
  @IsOptional()
  @IsString()
  stop_profit_or_loss_order_type: string;

  /**
   * 止盈止损类型 more_profit-多单止盈 more_loss-多单止损 less_profit-空单止盈 less_profit-空单止损
   */
  @IsOptional()
  @IsString()
  stop_profit_or_loss_type: string;

  /**
   * 止盈止损比例
   */
  @IsOptional()
  @IsNumber()
  stop_profit_or_loss_scale: number;

  /**
   * 开仓保护
   */
  @IsString()
  open_position_protect: string;

  /**
   * 平仓时是否做反手
   */
  @IsOptional()
  @IsBoolean()
  is_hand_back: boolean;

  /**
   * 账户最低预留金额
   */
  @IsNumber()
  min_amount: number;

  /**
   * 开仓方向 both-双向 long-只做多 short-只做空
   */
  @IsString()
  open_position_direction: string;

  /**
   * 开仓比例
   */
  @IsNumber()
  open_position_scale: number;

  /**
   * 延时
   */
  @IsNumber()
  delay_time: number;
}
