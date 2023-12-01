import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { PagenateAttendeeDTO } from './dto/pagenate.dto';
import { MAX_ATTENDEE_COUNT_PER_PAGE } from './const/attendee.const';
import { UserEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AttendeeService {
	constructor(
		@InjectRepository(AttendeeEntity)
		private readonly attendeeRepository: Repository<AttendeeEntity>,

		private readonly eventsService: EventsService,

		private readonly usersService: UsersService
	) { }

	async getHistoryMyAttended(user: UserEntity): Promise<AttendeeEntity[]> {
		await this.usersService.getUserById(user.id);

		return await this.attendeeRepository
			.createQueryBuilder('attend')
			.where('attend.user_id = :userId', { userId: user.id })
			.getMany();
	}


	async getAttendeeAllByEvent(eventId: number, query: PagenateAttendeeDTO): Promise<AttendeeEntity[]> {
		await this.eventsService.getEventById(eventId);
		const offset: number = (query.page - 1) * MAX_ATTENDEE_COUNT_PER_PAGE;

		return this.attendeeRepository.createQueryBuilder('attendee')
			.where('attendee.event_id = :eventId', { eventId })
			.offset(offset)
			.limit(MAX_ATTENDEE_COUNT_PER_PAGE)
			.getMany();
	}

	async registerAttendToEvent(eventId: number, user: UserEntity) {
		const event = await this.eventsService.getEventById(eventId);

		return await this.attendeeRepository.save({
			user,
			event
		});

		// return await this.attendeeRepository.save();
	}
}
