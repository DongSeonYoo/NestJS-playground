import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AttendeeService } from './attendee.service';

@Controller('/attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) { }

  @Get('/list/:eventId')
  getAttendeeListByEventId(
    @Param('eventId', ParseIntPipe) eventId: number
  ) {
    return this.attendeeService.getAttendeeAllByEvent(eventId);
  }
}
