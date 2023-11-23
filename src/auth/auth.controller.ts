import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthenticationGuard } from './guard/local.guard';
import { RequestWithUser } from './request-user.interface';
import { LoginUserDTO } from './dto/login-user.dto';

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
    @Request() req
  ) {
    return req.user;
  }
}
