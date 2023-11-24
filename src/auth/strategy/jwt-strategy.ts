import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt"; // passport strategy - jwt거를 가져와야함
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authServices: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.Authentication;
				}
			]),
			ignoreExpiration: true,
			secretOrKey: 'jwt secret key',
		});
	}

	// jwt passport에서 jwt.verify함수가 실행되면 (토큰이 올바른지 확인하면) 해당 validate 함수를 지가 알아서 실행함
	// jwt passport가 validate 지멋대로 실행시켜버림, 첫번쨰 파라미터는 해독된 Payload, 두번째 함수는 done 함수(뭔지알지?)
	async validate(payload: any, done: VerifiedCallback): Promise<any> {
		return this.authServices.getUserById(payload.id);
	}
}
