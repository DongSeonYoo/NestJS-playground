import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthenticationGuard } from './guard/local.guard';
import { Response } from 'express';
import { UserDecorator } from './decorator/user-info.decorator';
import { UserEntity } from 'src/users/users.entity';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(
    @Body() createUserDTO: CreateUserDto
  ) {
    return this.authService.register(createUserDTO);
  }

  // @UseGuards(LocalAuthenticationGuard)
  // @Post('login')
  // login(
  //   @Body() loginUserDTO: LoginUserDTO
  // ) {
  //   return this.authService.login(loginUserDTO);
  // }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  login(
    @UserDecorator() user: UserEntity,
    @Res() res
  ) {
    const accessToken = this.authService.signAccessToken(user);
    res.cookie('accessToken', accessToken);

    return res.status(200).send();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@UserDecorator() user: UserEntity) {
    return user;
  }
}
