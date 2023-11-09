import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/entities/User.entities';
import { JWT_SECRET } from './const/auth.const';

@Injectable()
export class AuthService {
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

	constructor(private readonly jwtService: JwtService) { }

	/**
	 * payload에 들어갈 정보?
	 * 1. sub (id) pk라고생각
	 * 2. type : 'accessToken' | 'refreshToken'
	 */
	// signToken(user: Pick<UserModel, 'email' | 'id'>, isRefreshToken: Boolean) {
	// 	const payload = {
	// 		id: user.id,
	// 		email: user.email,
	// 		type: isRefreshToken ? true : false
	// 	};
	// 	return this.jwtService.sign(payload, {
	// 		// secret: JWT_SECRET
	// 	})
	// }
}
