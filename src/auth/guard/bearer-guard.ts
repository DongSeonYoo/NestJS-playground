import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class BearerTokenGuard implements CanActivate {
	constructor(private readonly authServices: AuthService,
		private readonly userServices: UsersService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const rawToken = req.headers['authorization'];

		if (!rawToken) {
			throw new UnauthorizedException("토큰이 없습니다");
		}
		const token = this.authServices.extractTokenFromHeader(rawToken, true);
		const result = await this.authServices.verifyToken(token);

		/** request에 넣을 정보
		 * 1. 사용자 정보 (유저)
		 * 2. token - 그대로
		 * 3. tokenType - access | refresh
		 */
		const user = await this.userServices.getUserByEmail(result.email);
		req.user = user;
		req.token = token;
		req.tokenType = result.type;

		return true;
	}
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context);

		const req = context.switchToHttp().getRequest();
		if (req.tokenType !== "access") {
			throw new UnauthorizedException("accessToken이 아닙니다");
		}
		return true;
	}
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context);

		const req = context.switchToHttp().getRequest();
		if (req.tokenType !== "refresh") {
			throw new UnauthorizedException("refresh이 아닙니다");
		}
		return true;
	}
}