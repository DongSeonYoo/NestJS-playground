import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
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
    return this.eventsService.getEvnetsAndAttendees(eventId);
  }

  @Post()
  createEvents(
    @Body() body: CreateEventDto,
    @UserDecorator() user: UserEntity
  ) {
    return this.eventsService.createEvent(body, user);
  }

  @Put(':eventId')
  async updateEvents(
    @Body() updateEventDTO: UpdateEventDTO,
    @Param('eventId', ParseIntPipe) eventId: number,
    @UserDecorator() user: UserEntity
  ) {
    const event = await this.eventsService.getEventById(eventId);
    if (event.host.id !== user.id) throw new UnauthorizedException('호스트만 수정가능');

    this.eventsService.updateEvent(eventId, updateEventDTO);
  }

  @Delete()
  async deleteEvent(
    @Body('eventId', ParseIntPipe) eventId: number,
    @UserDecorator() user: UserEntity
  ) {
    const event = await this.eventsService.getEventById(eventId);
    if (event.host.id !== user.id) throw new UnauthorizedException('호스트만 수정가능');


    return this.eventsService.deleteEvent(eventId);
  }
}
