import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDTO } from './dto/create-post.reqeust.dto.ts';
import { UserEntity } from '../users/users.entity';
import { UserDecorator } from '../auth/decorator/user-info.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }

  @Post()
  createPost(
    @Body() createPostDTO: CreatePostRequestDTO,
    @UserDecorator() userId: number
  ) {
    return this.postsService.createPost(createPostDTO, userId);
  }
}
