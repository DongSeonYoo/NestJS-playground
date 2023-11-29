import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AttendeeService } from './attendee.service';

@Controller('/events')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) { }

  @Get(':eventId/attendees')
  getAttendeeAllByEvent(
    @Param('eventId', ParseIntPipe) eventId: number
  ) {
    return this.attendeeService.getAttendeeAllByEvent(eventId);
  }
}
