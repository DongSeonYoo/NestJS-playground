import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';
import { EventsModule } from '../events/events.module';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendeeEntity,
    ]),
    EventsModule,
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService]
})
export class AttendeeModule { }
