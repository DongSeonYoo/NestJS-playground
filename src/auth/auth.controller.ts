import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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

  @Post('login')
  login(
    @Body() loginUserDTO: LoginUserDTO
  ) {
    return this.authService.login(loginUserDTO);
  }
}
