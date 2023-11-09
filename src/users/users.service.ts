import { Injectable, NotFoundException } from '@nestjs/common';
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

	async createUser(nickname: string, email: string, password: string) {
		const user = this.usersRepository.create({
			nickname,
			email,
			password
		});
		return await this.usersRepository.save(user);
	}

	async getAllUsers() {
		return this.usersRepository.find();
	}
}
