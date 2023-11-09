import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/Post.entity';
import { UserModel } from 'src/users/entities/User.entities';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsModel,
      UserModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule { }
