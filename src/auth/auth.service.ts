import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { POSTGRES_ERROR_CODE } from 'src/common/database/postgres-errorcode';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userServices: UsersService
	) { }

	async register(createUserDTO: CreateUserDto) {
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

	async login(email: string, password: string) {

		try {
			const foundUser = await this.userServices.getByEmail(email);
			await this.comparePassword(password, foundUser.password);

			return foundUser;
		} catch (error) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}
	}


	async comparePassword(plainPassword: string, hashedPassword: string) {
		const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

		if (!passwordMatch) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}
	}
}
