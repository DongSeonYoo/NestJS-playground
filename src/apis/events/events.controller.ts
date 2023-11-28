import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UserEntity } from '../users/users.entity';
import { UserDecorator } from '../auth/decorator/user-info.decorator';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) { }

  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  createEvents(
    @Body() body: CreateEventDto,
    @UserDecorator() user: UserEntity
  ) {
    return this.eventsService.createEvent(body, user);
  }
  /**
   * put, delete 이벤트 하고,
   * attendee 관계 연결해서 쿵짝쿵짝
   */
}
