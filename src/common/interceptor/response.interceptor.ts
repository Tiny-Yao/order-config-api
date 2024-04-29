// response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('响应拦截 Before...');
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: data === null ? '操作失败' : '操作成功',
        data: data,
      })),
    );
  }
}
