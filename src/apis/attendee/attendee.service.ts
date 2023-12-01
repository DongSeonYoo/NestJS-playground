import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';

@Injectable()
export class AttendeeService {
	constructor(
		@InjectRepository(AttendeeEntity)
		private readonly attendeeRepository: Repository<AttendeeEntity>,

		private readonly eventsService: EventsService
	) { }

	async getAttendeeAllByEvent(eventId: number): Promise<AttendeeEntity[]> {
		await this.eventsService.getEventById(eventId);

		return this.attendeeRepository.createQueryBuilder('attendee')
			.where('attendee.event_id = :eventId', { eventId })
			.getMany();
	}
}
