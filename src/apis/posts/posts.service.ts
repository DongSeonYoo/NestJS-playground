import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';
import { CreatePostRequestDTO as CreatePostRequestDTO } from './dto/create-post.reqeust.dto.ts';
import { plainToInstance } from 'class-transformer';
import { CreatePostResponseDTO } from './dto/create-post.response.dto';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostsEntity)
		private readonly postsRepository: Repository<PostsEntity>
	) { }

	async createPost(createPostDTO: CreatePostRequestDTO, userId: number) {
		const createPost = this.postsRepository.create({
			...createPostDTO,
			authorId: userId
		});

		// return await this.postsRepository.save(createPost);

		const result = await this.postsRepository.save(createPost);
		return plainToInstance(CreatePostResponseDTO, result);
	}
}
