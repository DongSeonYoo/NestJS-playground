import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/entities/User.entities';
import { HASH_ROUND, JWT_SECRET } from './const/auth.const';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	/**
	 * 1) 사용자가 로그인 또는 회원가입을 진행하면
	 * 	accessToken과 refreshtoken을 발급받는다
	 * 2) 로그인 할때는 basic 토큰과 함꼐 욫ㅇ을 보낸다
	 * 	basic token은 'email:password'를 base64로 인코딩한 형태.
	 *  {authorization: 'Basic {token}'}
	 * 3) 아무나 접근 할 수 없는 정보를 접근할때는
	 * 	accessToken을 header에 추가해서 요청과 함께 보낸다
	 */

	/**
	 * TODO
	 * 1. registerWithEmail // 이메일로 회원가입 email, nickname, password를 받아서, 생성이 완료 되면 accessToken과 refreshToken 발급. (회원 가입 후 바로 로그인시켜줌)
	 * 2. loginWithEmail // 이메일, password를 입력받아 사용자 검증을 진행한다. (bcrypt 해싱해서 같은지 비교) -> 검증이 완료되면 accessToken과 refreshToken발급
	 * 3. loginUser // 1과 2에서 필용한 accessToken과 refreshToken 반환하는 로직(모듈)을 만들자
	 * 4. signToken // 3에서 필요한 accessToken과 refreshToken을 sign하는 로직
	 * 5. authenticateWithEmailAndPassword // 2번에서 로그인을 진행할 때 필요한 검증 진행
	 * 	5-1: 사용자가 존재하는지?
	 * 	5-2: 비밀번호가 맞는지 확인(해싱 compare)
	 * 	5-3: 모두 통과되면 사용자 정보 반환
	 */

	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) { }

	/**
	 * payload에 들어갈 정보?
	 * 1. sub (id) pk라고생각
	 * 2. type : 'accessToken' | 'refreshToken'
	 */
	signToken(user: Pick<UserModel, 'email' | 'id'>, isRefreshToken: Boolean) {
		const payload = {
			id: user.id,
			email: user.email,
			type: isRefreshToken ? true : false
		};
		return this.jwtService.sign(payload, {
			secret: JWT_SECRET,
			// second
			expiresIn: isRefreshToken ? 3600 : 300
		})
	}

	loginUsers(user: Pick<UserModel, 'email' | 'id'>) {
		return {
			accessToken: this.signToken(user, false),
			refreshToken: this.signToken(user, true),
		}
	}

	async authenticateWithEmailAndPassword(user: Pick<UserModel, 'email' | 'password'>) {
		const existingUser = await this.usersService.getUserByEmail(user.email);
		if (!existingUser) throw new UnauthorizedException("존재하지 않는 사용자입니다");

		const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
		if (!passwordMatch) {
			throw new UnauthorizedException('비밀번호가 틀렸습니다');
		}
		return existingUser;
	}

	async loginWithEmail(user: Pick<UserModel, 'email' | 'password'>) {
		const existingUser = await this.authenticateWithEmailAndPassword(user);
		return this.loginUsers(existingUser);
	}

	async registerWithEmail(user: Pick<UserModel, 'nickname' | 'email' | 'password'>) {
		const hasing = await bcrypt.hash(
			user.password,
			HASH_ROUND,
		);

		const newUSer = await this.usersService.createUser({
			...user,
			password: hasing
		});
		return this.loginUsers(newUSer);
	}

	/**
	 * 
	 */
	extractTokenFromHeader(haeder: string, isBearer: boolean) {
		const splitToken = haeder.split(' ');
		const prefix = isBearer ? 'Bearer' : 'Basic';
		if (splitToken.length !== 2 || splitToken[0] !== prefix) throw new UnauthorizedException('잘못된 토큰입니다');

		const token = splitToken[1];
		return token;
	}

	decodedBasicToken(base64String: string) {
		const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
		const split = decoded.split(':');

		if (split.length !== 2) {
			throw new UnauthorizedException('잘못된 유형의 토큰입니다?');
		}
		const email = split[0];
		const password = split[1];

		return {
			email,
			password
		}
	}

	verifyToken(token: string) {
		return this.jwtService.verify(token, {
			secret: JWT_SECRET,
		});
	}

	rotateToken(token: string, isRefreshToken: boolean) {
		const decoded = this.jwtService.verify(token, {
			secret: JWT_SECRET,
		});
		if (decoded.type !== 'refresh') {
			throw new UnauthorizedException("토큰 재발급은 refresh token으로만 가능");
		}
		return this.signToken({
			...decoded,
		}, isRefreshToken);
	}
}
