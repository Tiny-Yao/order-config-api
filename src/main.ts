import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // 从 .env 文件加载环境变量
  const result = config();

  if (result.error) {
    // 处理加载环境变量时出现的错误
    Logger.error(`读取环境变量失败: ${result.error.message}`);
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  // 全局注册过滤器-自定义异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册管道-自定义管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: true,
      whitelist: true,
      enableDebugMessages: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) => {
          const constraints = Object.values(error.constraints);
          return constraints.join(', ');
        });
        const errorMessage = errorMessages.join(', ');
        return new HttpException(
          {
            message: `pipe输入数据验证失败: ${errorMessage}`,
            errors: errors.map((error) => {
              return {
                property: error.property,
                constraints: Object.values(error.constraints),
              };
            }),
          },
          400,
        );
      },
    }),
  );
  await app.listen(process.env.PORT);
  console.log(
    `应用已运行，请打开： ${process.env.HOSTNAME}:${process.env.PORT}`,
  );
}
bootstrap();
