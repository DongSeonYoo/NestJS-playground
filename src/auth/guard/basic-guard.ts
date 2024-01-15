/**
 * 1. 요청 객체를 불러오고
 * 	authorization header로부터 토큰을 가져온다
 * 
 * 2. authService.extractTokenFromHeader로부터 사용할 수 있는 토큰의 형태를 추출한다
 * 
 * 3. authService.decodeBasicToken을 실행해서 email과 password를 추출한다
 * 
 * 4. email과 password를 이용해서 사용자를 가져온다
	authService.authenticateWithEmailAndPassword
*/

import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class BasicTokenGaurd implements CanActivate {
	constructor(private readonly authService: AuthService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const rawToken = req.headers['authorization'];

		if (!rawToken) throw new UnauthorizedException('권한이 없습니다');

		const token = this.authService.extractTokenFromHeader(rawToken, false);
		const { email, password } = this.authService.decodedBasicToken(token);

		const user = await this.authService.authenticateWithEmailAndPassword({
			email,
			password
		});

		req.user = user;
		req.email = email;

		return true;
	}
}