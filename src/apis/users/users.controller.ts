import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/apis/auth/guard/jwt.guard';
import { UserDecorator } from 'src/apis/auth/decorator/user-info.decorator';
import { UserEntity } from './users.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  viewProfile(
    @UserDecorator() user: UserEntity
  ) {
    return this.usersService.getUserById(user.id);
  }
}
