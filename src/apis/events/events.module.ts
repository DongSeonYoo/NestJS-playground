import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { EventsEntity } from './entities/events.entity';
import { AttendeeEntity } from '../attendee/entities/attendee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      EventsEntity,
      AttendeeEntity
    ])
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
