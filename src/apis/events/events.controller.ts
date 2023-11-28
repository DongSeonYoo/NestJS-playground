import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UserEntity } from '../users/users.entity';
import { UserDecorator } from '../auth/decorator/user-info.decorator';
import { UpdateEventDTO } from './dto/update-event.dto';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) { }

  @Get('/all')
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('/:eventId')
  getEventsById(
    @Param('eventId', ParseIntPipe) eventId: number
  ) {
    return this.eventsService.getEventsUsingQueryBuilder(eventId);
  }

  @Post()
  createEvents(
    @Body() body: CreateEventDto,
    @UserDecorator() user: UserEntity
  ) {
    return this.eventsService.createEvent(body, user);
  }

  @Put(':eventId')
  updateEvents(
    @Body() updateEventDTO: UpdateEventDTO,
    @Param('eventId', ParseIntPipe) eventId: number
  ) {
    return this.eventsService.updateEvent(eventId, updateEventDTO);
  }

  @Delete()
  deleteEvent(
    @Body('eventId', ParseIntPipe) eventId: number
  ) {
    return this.eventsService.deleteEvent(eventId);
  }


  /**
   * put, delete 이벤트 하고,
   * attendee 관계 연결해서 쿵짝쿵짝
   */
}
