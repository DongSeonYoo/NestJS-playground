import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { EventsEntity } from './entities/events.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      EventsEntity
    ])
  ],
  exports: [
    EventsService
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
