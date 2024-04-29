import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GlobalService {
  /**
   * 哈希加密
   * @param str 哈希的目标值
   * @returns 加密后的字符串
   */
  public encryptPassword(str: string): string {
    try {
      return CryptoJS.SHA256(str).toString();
    } catch (error) {
      console.error('哈希加密失败:', error);
      return null;
    }
  }

  /**
   * AES加密
   * @param str 待加密的字符串
   */
  public encrypt(str: string): string {
    if (!str) return '要加密的字符串为空';
    if (!process.env.AES_SECRET_KEY) {
      console.error('AES解密失败: 未设置AES_SECRET_KEY');
    }
    try {
      return CryptoJS.AES.encrypt(str, process.env.AES_SECRET_KEY).toString();
    } catch (error) {
      console.error('AES加密失败:', error);
      return null;
    }
  }

  /**
   * AES解密
   * @param str 加密后的字符串
   */
  public decrypt(str: string): string {
    if (!str) return '要解密的字符串为空';
    if (!process.env.AES_SECRET_KEY) {
      console.error('AES解密失败: 未设置AES_SECRET_KEY');
    }
    try {
      return CryptoJS.AES.decrypt(str, process.env.AES_SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
    } catch (error) {
      console.error('AES解密失败:', error);
      return null;
    }
  }

  /**
   * 生成token
   * @param password 用户密码
   * @param timestamp 时间戳
   */
  public generateToken(password, timestamp): string {
    if (!process.env.JWT_SECRET_KEY) {
      console.error('AES解密失败: 未设置JWT_SECRET_KEY');
    }
    try {
      return jwt.sign({ password, timestamp }, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error('生成token失败:', error);
      return null;
    }
  }
}
