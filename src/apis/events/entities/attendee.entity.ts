import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventsEntity } from "./events.entity";
import { UserEntity } from "src/apis/users/users.entity";

@Entity({
	name: 'attendee_tb'
})
export class AttendeeEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => EventsEntity, (event) => event.attendees, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({
		name: 'event_id',
	})
	event: EventsEntity;
}