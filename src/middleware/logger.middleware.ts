import { CallHandler, ExecutionContext, NestInterceptor, NestMiddleware } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		const req = context.switchToHttp().getRequest();
		return next
			.handle()
			.pipe(
				tap((res) => {
					// 여기서 응답 객체 받아서 쿵짝퐁짝
				})
			)
	}
}