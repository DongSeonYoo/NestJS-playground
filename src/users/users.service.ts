import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) { }

	async getByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: {
				email
			}
		});
		if (!user) {
			throw new NotFoundException('해당하는 유저가 없습니다');
		}

		return user;
	}

	async create(userData: CreateUserDto) {
		const newUser = this.userRepository.create(userData);
		await this.userRepository.save(newUser);
		return newUser;
	}
}
