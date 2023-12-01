import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDTO } from './dto/create-post.reqeust.dto.ts';
import { UserEntity } from '../users/users.entity';
import { UserDecorator } from '../auth/decorator/user-info.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CursorPagenameRequestDTO } from './dto/cursor-pagenate.dto';
import { PagenateRequestDTO } from './dto/pagenate.dto';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }

  @Post()
  createPost(
    @Body() createPostDTO: CreatePostRequestDTO,
    @UserDecorator() userId: UserEntity
  ) {
    return this.postsService.createPost(createPostDTO, userId);
  }

  // page는 default = 1
  @Get('all')
  getAllPosts(
    @Query() query: PagenateRequestDTO
  ) {
    return this.postsService.getAllPosts(query);
  }

  @Get('/cursor/pagenate')
  pagenatePosts(
    @Query() query: CursorPagenameRequestDTO
  ) {
    return this.postsService.cursorPagenate(query);
  }

  @Get('/:userId')
  getUserPosts(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: PagenateRequestDTO
  ) {
    return this.postsService.getUserPosts(userId, query);
  }
}
