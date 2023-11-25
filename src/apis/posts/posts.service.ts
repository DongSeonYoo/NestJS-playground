import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';
import { CreatePostRequestDTO as CreatePostRequestDTO } from './dto/create-post.reqeust.dto.ts';
import { plainToInstance } from 'class-transformer';
import { CreatePostResponseDTO } from './dto/create-post.response.dto';
import { UserEntity } from '../users/users.entity';
import { CursorPagenameRequestDTO } from './dto/cursor-pagenate.dto';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostsEntity)
		private readonly postsRepository: Repository<PostsEntity>
	) { }

	async createPost(createPostDTO: CreatePostRequestDTO, userId: UserEntity) {
		const createPost = this.postsRepository.create({
			...createPostDTO,
			author: userId
		});

		const result = await this.postsRepository.save(createPost);
		return plainToInstance(CreatePostResponseDTO, result);
	}

	async getAllPosts() {
		return this.postsRepository.find({
			relations: {
				author: true
			}
		});
	}

	// 오름차순으로 정렬하는 cursor-pagenation
	async cursorPagenate(page: CursorPagenameRequestDTO) {
		return this.postsRepository.find({
			where: {
				// 더 큰, 더 많은
				id: MoreThan(page.where__id_more_than),
			},
			order: {
				createdAt: page.order_createdAt
			},
			take: page.take
		})
	}
}
