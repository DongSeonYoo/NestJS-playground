import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/auth/decorator/user-info.decorator';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  viewProfile(
    @UserDecorator() user: UserEntity
  ) {
    return this.usersService.getUserById(user.id);
  }
}
