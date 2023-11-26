import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostsModule } from './apis/posts/posts.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      typeORMConfig
    ),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
})
export class AppModule { }
