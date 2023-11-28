import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttendeeEntity } from "./attendee.entity";

@Entity({
	name: 'event_tb'
})
export class EventsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	when: Date;

	@OneToMany(() => AttendeeEntity, (attendee) => attendee.event)
	attendees: AttendeeEntity[]
}