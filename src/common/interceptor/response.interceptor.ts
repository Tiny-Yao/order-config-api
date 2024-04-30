import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
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
        status: 'success',
        message: '请求成功',
        ...data,
      })),
    );
  }
}
