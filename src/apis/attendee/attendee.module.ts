import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendeeEntity
    ])
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService],
})
export class AttendeeModule { }
