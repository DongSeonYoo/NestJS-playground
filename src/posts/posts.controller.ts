import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userServices: UsersService,
  ) { }

  @Post()
  @HttpCode(200)
  async createPost(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const user = await this.userServices.findUser(authorId);

    return await this.postsService.createPost(user, title, content);
  }

  @Get('/all')
  getPostAll() {
    return this.postsService.getPostAll();
  }

  @Get('/user-id/:userId')
  getPostByUserIdx(
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.postsService.getPostByUserIdx(userId);
  }

  @Get('/:postId')
  getPostByPostId(
    @Param('postId', ParseIntPipe) postId: number
  ) {
    return this.postsService.getPostByIdx(postId);
  }
}
