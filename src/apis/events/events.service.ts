import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EventsEntity } from './entities/events.entity';
import { AttendeeEntity } from '../attendee/entities/attendee.entity';
import { UserEntity } from '../users/users.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdateEventDTO } from './dto/update-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(EventsEntity)
		private readonly eventRepository: Repository<EventsEntity>
	) { }

	private getEventsBaseQuery() {
		return this.eventRepository.createQueryBuilder('e')
			.orderBy('e.id', 'DESC');
	}

	public getEventWithAttendeeCountQuery() {
		return this.getEventsBaseQuery()
			.loadRelationCountAndMap(
				'e.attendeeCount', 'e.attendees'
			);
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
		return await this.getEventWithAttendeeCountQuery()
			.andWhere('e.id = :eventId', { eventId })
			.getOne();
	}

	async updateEvent(eventId: number, updateEventDTO: UpdateEventDTO) {
		// const updateResult = await this.eventRepository.update(eventId, {
		// 	...updateEventDTO,
		// });

		// if (!updateResult.affected) throw new NotFoundException('해당하는 이벤트가 없읍니다');

		// return {
		// 	message: "수정성공요"
		// }
		await this.getEventById(eventId);

		return this.eventRepository.createQueryBuilder('e')
			.update()
			.set({ ...updateEventDTO })
			.where('id = :eventId', { eventId })
			.execute();
	}

	async deleteEvent(eventId: number) {
		// const deletedResult = await this.eventRepository.delete(eventId);

		// if (!deletedResult.affected) throw new BadRequestException('해당하는 이벤트가 존재하지 않습니다');

		// return {
		// 	message: "삭제성공요"
		// }

		await this.getEventById(eventId);

		return this.eventRepository.createQueryBuilder('e')
			.delete()
			.where('e.id = :id', { eventId })
			.execute();
	}
}
