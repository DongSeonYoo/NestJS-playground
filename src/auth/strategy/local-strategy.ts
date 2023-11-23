import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authServices: AuthService) {
		super({
			usernameField: 'email'
		});
	}

	// async validate(loginUserDTO: LoginUserDTO) {
	// 	console.log(loginUserDTO)
	// 	const user = await this.authServices.login(loginUserDTO);
	// 	if (!user) {
	// 		throw new UnauthorizedException();
	// 	}

	// 	return user;
	// }

	async validate(email: string, password: string) {
		return await this.authServices.login(email, password);
	}
}