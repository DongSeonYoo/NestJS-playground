import { Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { PagenateAttendeeDTO } from './dto/pagenate.dto';
import { UserDecorator } from '../auth/decorator/user-info.decorator';
import { UserEntity } from '../users/users.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('/attendee')
@UseGuards(JwtAuthGuard)
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) { }

  @Get('/history')
  getHistoryMyAttended(
    @UserDecorator() user: UserEntity
  ) {
    return this.attendeeService.getHistoryMyAttended(user);
  }

  @Get('/list/:eventId')
  getAttendeeListByEventId(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Query() query: PagenateAttendeeDTO
  ) {
    return this.attendeeService.getAttendeeAllByEvent(eventId, query);
  }

  @Post('/event/:eventId')
  attendToEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @UserDecorator() user: UserEntity
  ) {
    return this.attendeeService.registerAttendToEvent(eventId, user);
  }
}
