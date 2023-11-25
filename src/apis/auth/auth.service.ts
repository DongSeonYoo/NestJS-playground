import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/apis/users/dto/create-user.dto';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';
import { POSTGRES_ERROR_CODE } from 'src/common/database/postgres-errorcode';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/apis/users/users.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly userServices: UsersService,
		private readonly jwtServices: JwtService
	) { }

	async tokenValidate(payload: any) {
		return await this.userServices.getUserById(payload.id);
	}

	getUserById(userId: number) {
		return this.userServices.getUserById(userId);
	}

	async registerUser(createUserDTO: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

		try {
			const createUser = await this.userServices.create({
				...createUserDTO,
				password: hashedPassword
			});
			return createUser;
		} catch (error) {
			if (error.code === POSTGRES_ERROR_CODE.UNIQUE_VIOLATION) {
				throw new BadRequestException('해당하는 이메일의 사용자가 존재함');
			}
		}
	}

	// async login(loginUserDTO: LoginUserDTO) {
	// 	const { email, password } = loginUserDTO;

	// 	try {
	// 		const foundUser = await this.userServices.getByEmail(email);
	// 		await this.comparePassword(password, foundUser.password);

	// 		return foundUser;
	// 	} catch (error) {
	// 		throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
	// 	}
	// }

	async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
		try {
			const { email, password } = loginUserDTO;
			const foundUser = await this.userServices.getUserByEmail(email);
			await this.comparePassword(password, foundUser.password);

			return foundUser;

		} catch (error) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}
	}

	signAccessToken(user: Pick<UserEntity, 'id' | 'email'>): string {
		const payload = {
			id: user.id,
			email: user.email
		};
		const token = this.jwtServices.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=600s`;
	}


	async comparePassword(plainPassword: string, hashedPassword: string) {
		const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

		if (!passwordMatch) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}

		return passwordMatch;
	}
}
