import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';
import { EventsModule } from '../events/events.module';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendeeEntity,
    ]),
    EventsModule,
    UsersModule
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService]
})
export class AttendeeModule { }
