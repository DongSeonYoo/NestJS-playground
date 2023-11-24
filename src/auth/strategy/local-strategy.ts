import { BadRequestException, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginUserDTO } from "../dto/login-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authServices: AuthService) {
		super({
			usernameField: 'email'
		});
	}

	async validate(email: string, password: string) {
		const loginUserDTO: LoginUserDTO = { email, password };
		return await this.authServices.login(loginUserDTO);
	}
}
