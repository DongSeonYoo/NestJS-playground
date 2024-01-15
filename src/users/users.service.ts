import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/User.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserModel)
		private readonly usersRepository: Repository<UserModel>
	) { }

	async findUser(userId: number): Promise<UserModel> {
		const foundUser = await this.usersRepository.findOne({
			where: {
				id: userId
			}
		});
		if (!foundUser) throw new NotFoundException('해당하는 사용자가 없습니다');

		return foundUser;
	}

	async createUser(user: Pick<UserModel, 'nickname' | 'email' | 'password'>) {
		// 1. 닉네임 중복이 없는지
		// 	exist() -> 조건에 해당되는 값이 없으면 true 반환
		const nickNameExistedUser = await this.usersRepository.exist({
			where: {
				nickname: user.nickname
			}
		});
		if (nickNameExistedUser) throw new BadRequestException("이미 존재하는 닉네임 입니다");

		const emailExistedUser = await this.usersRepository.exist({
			where: {
				email: user.email
			}
		});
		if (emailExistedUser) throw new BadRequestException("이미 존재하는 이메일 입니다");

		const createdUser = await this.usersRepository.create({
			nickname: user.nickname,
			email: user.email,
			password: user.password
		});
		return await this.usersRepository.save(createdUser);
	}

	async getAllUsers() {
		return this.usersRepository.find();
	}

	async getUserByEmail(email: string) {
		return await this.usersRepository.findOne({
			where: {
				email
			}
		});
	}
}
