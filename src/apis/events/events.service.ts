import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EventsEntity } from './entities/events.entity';
import { AttendeeEntity } from './entities/attendee.entity';
import { UserEntity } from '../users/users.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdateEventDTO } from './dto/update-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(EventsEntity)
		private readonly eventRepository: Repository<EventsEntity>,
		@InjectRepository(AttendeeEntity)
		private readonly attendRepository: Repository<AttendeeEntity>
	) { }

	private getEventsBaseQuery() {
		return this.eventRepository.createQueryBuilder('e')
			.orderBy('e.id', 'DESC');
	}

	async getAllEvents() {
		return this.eventRepository.find();
	}

	// 생성된 이벤트 아이디 리턴
	async createEvent(createEventDTO: CreateEventDto, user: UserEntity): Promise<EventsEntity> {
		return this.eventRepository.save({
			...createEventDTO,
			host: user
		});
	}

	async getEvnets(eventId: number) {
		const findedEvents = await this.eventRepository.findOne({
			where: {
				id: eventId
			}
		});

		if (!findedEvents) throw new NotFoundException('해당하는이벤트가 없읍니다');

		return findedEvents;
	}

	async getEventsUsingQueryBuilder(eventId: number): Promise<EventsEntity> {
		return await this.getEventsBaseQuery()
			.andWhere('e.id = :eventId', { eventId })
			.getOne();
	}

	async updateEvent(eventId: number, updateEventDTO: UpdateEventDTO) {
		const updateResult = await this.eventRepository.update(eventId, {
			...updateEventDTO,
		});

		if (!updateResult.affected) throw new NotFoundException('해당하는 이벤트가 없읍니다');

		return {
			message: "수정성공요"
		}
	}

	async deleteEvent(eventId: number) {
		const deletedResult = await this.eventRepository.delete(eventId);

		if (!deletedResult.affected) throw new BadRequestException('해당하는 이벤트가 존재하지 않습니다');

		return {
			message: "삭제성공요"
		}
	}
}
