import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';
import { CreatePostRequestDTO as CreatePostRequestDTO } from './dto/create-post.reqeust.dto.ts';
import { plainToInstance } from 'class-transformer';
import { CreatePostResponseDTO } from './dto/create-post.response.dto';
import { UserEntity } from '../users/users.entity';
import { CursorPagenameRequestDTO } from './dto/cursor-pagenate.dto';
import { PagenateRequestDTO } from './dto/pagenate.dto';
import { MAX_CONTENT_PER_PAGE } from './const/post.const';
import { PostResponseDTO } from './dto/post-response.dto';

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

	async getAllPosts(query: PagenateRequestDTO) {
		// offset = page - 1 * max_content_per_page
		const { page } = query;
		const skip = (page - 1) * MAX_CONTENT_PER_PAGE;

		return await this.postsRepository.find({
			take: MAX_CONTENT_PER_PAGE,
			skip,
			relations: ['author']
		});

	}

	async getUserPosts(userId: number, query: PagenateRequestDTO): Promise<PostResponseDTO> {
		const { page } = query;
		const skip = (page - 1) * MAX_CONTENT_PER_PAGE;
		const [posts, count] = await this.postsRepository.findAndCount({
			where: {
				author: {
					id: userId
				}
			},
			take: MAX_CONTENT_PER_PAGE,
			skip
		});

		return { count, posts };
	}

	// 오름차순으로 정렬하는 cursor-pagenation
	async cursorPagenate(page: CursorPagenameRequestDTO) {
		return this.postsRepository.find({
			where: {
				id: MoreThan(page.where__id_more_than),
			},
			order: {
				createdAt: page.order_createdAt
			},
			take: page.take
		})
	}
}
