import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostsModule } from './apis/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      typeORMConfig
    ),
    UsersModule,
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
})
export class AppModule { }
