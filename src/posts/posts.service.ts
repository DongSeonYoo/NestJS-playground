import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/User.entities';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostsModel)
		private readonly postRepository: Repository<PostsModel>,
	) { }

	async createPost(user: UserModel, title: string, content: string) {
		return await this.postRepository.save({
			title,
			content,
			author: user
		});
	}

	async getPostAll() {
		return await this.postRepository.find({
			relations: {
				author: true
			}
		});
	}

	async getPostByUserIdx(userId: number) {
		return await this.postRepository.find({
			relations: {
				author: true
			},
			where: {
				author: {
					id: userId
				}
			}
		})
	}

	async getPostByIdx(postId: number) {
		return await this.postRepository.find({
			where: {
				id: postId
			},
			relations: {
				author: true
			}
		});
	}
}

// 이거 여기서 user리포지토리 주입하지 않고도 post리포지토리의 fk에서 user리포지토리 접근하면 됨!
