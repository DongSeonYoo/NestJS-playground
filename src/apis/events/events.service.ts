import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsEntity } from './entities/events.entity';
import { UserEntity } from '../users/users.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(EventsEntity)
		private readonly eventRepository: Repository<EventsEntity>,
		private readonly userService: UsersService
	) {
	}

	private getEventsBaseQuery() {
		return this.eventRepository.createQueryBuilder('e')
			.orderBy('e.id', 'DESC');
	}

	private getEventWithAttendeeCountQuery() {
		return this.getEventsBaseQuery()
			.loadRelationCountAndMap(
				'e.attendeeCount', 'e.attendees'
			);
	}

	async getAllEvents() {
		return this.eventRepository.find();
	}

	async getEventById(eventId: number): Promise<EventsEntity> {
		const event = await this.eventRepository.findOne({
			where: {
				id: eventId
			},
			relations: {
				host: true
			}
		});
		if (!event) {
			throw new NotFoundException('이벤트가 업음');
		}
		return event;
	}

	// 생성된 이벤트 아이디 리턴
	async createEvent(createEventDTO: CreateEventDto, user: UserEntity): Promise<EventsEntity> {
		return this.eventRepository.save({
			...createEventDTO,
			host: user
		});
	}

	/**
	 * 이벤트 아이디를 받아서 해당하는 이벤트 정보와, 참석자 리스트를 보내줌
	 */
	async getEvnetsAndAttendees(eventId: number) {
		const result = await this.eventRepository.createQueryBuilder('e')
			.leftJoinAndSelect('e.attendees', 'a')
			.where('e.id = :eventId', { eventId })
			.getOne();

		if (!result) throw new NotFoundException('해당하는 이벤트가 없습니다');

		return result;
	}

	async getEventsUsingQueryBuilder(eventId: number): Promise<EventsEntity> {
		const query = this.getEventWithAttendeeCountQuery()
			.andWhere('e.id = :eventId', { eventId });
		// console.log(query.getQuery())

		return await query.getOne();
	}

	// 유저의 아이디를 받아서 해당하는 유저가 주최한 이벤트들을 가져옴
	async getEventOrganizedByUserId(userId: number): Promise<EventsEntity[]> {
		await this.userService.getUserById(userId);

		return this.getEventsBaseQuery()
			.where('e.host_id = :userId', { userId })
			.getMany();
	}

	async updateEvent(eventId: number, updateEventDTO: UpdateEventDTO) {
		await this.getEventById(eventId);

		return this.eventRepository.createQueryBuilder('e')
			.update()
			.set({ ...updateEventDTO })
			.where('id = :eventId', { eventId })
			.execute();
	}

	async deleteEvent(eventId: number) {
		await this.getEventById(eventId);

		return this.eventRepository.createQueryBuilder('e')
			.delete()
			.where('e.id = :id', { eventId })
			.execute();
	}
}
