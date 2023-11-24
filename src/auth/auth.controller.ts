import { Body, Controller, HttpCode, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { UserDecorator } from './decorator/user-info.decorator';
import { UserEntity } from 'src/users/users.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(
    @UserDecorator() user: UserEntity,
    @Res({
      passthrough: true
    }) res: Response
  ) {
    const cookie = this.authService.signAccessToken(user);
    res.setHeader('Set-Cookie', cookie);

    return {
      message: '로그인 성공'
    }
  }

  @Post('signup')
  signup(
    @Body() createUserDTO: CreateUserDto
  ) {
    return this.authService.registerUser(createUserDTO);
  }
}
