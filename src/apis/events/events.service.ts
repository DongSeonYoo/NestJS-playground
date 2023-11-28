import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsEntity } from './entities/events.entity';
import { AttendeeEntity } from './entities/attendee.entity';
import { UserEntity } from '../users/users.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(EventsEntity)
		private readonly eventRepository: Repository<EventsEntity>,
		@InjectRepository(AttendeeEntity)
		private readonly attendRepository: Repository<AttendeeEntity>
	) { }

	async getAllEvents() {
		return this.eventRepository.find();
	}

	// 생성된 이벤트 아이디 리턴
	async createEvent(createEventDTO: CreateEventDto, user: UserEntity): Promise<EventsEntity> {
		return await this.eventRepository.save({
			...createEventDTO
		});
	}
}
