import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeeService {
	constructor(
		@InjectRepository(AttendeeEntity)
		private readonly attendeeRepository: Repository<AttendeeEntity>
	) { }

	async getAttendeeAllByEvent(eventId: number) {
		return this.attendeeRepository.find({
			where: {
				event: {
					id: eventId
				}
			}
		});
	}
}
