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
					return request?.cookies?.accessToken;
				}
			]),
			ignoreExpiration: true,
			secretOrKey: 'jwt secret key',
		});
	}

	async validate(payload: any, done: VerifiedCallback): Promise<any> {
		const user = await this.authServices.tokenValidate(payload);

		if (!user) {
			return done(new UnauthorizedException({ message: 'user does not exist' }), false);
		}
		return done(null, user);
	}
}