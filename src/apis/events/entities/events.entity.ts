import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendeeEntity } from "./attendee.entity";
import { UserEntity } from "src/apis/users/users.entity";

@Entity({
	name: 'event_tb'
})
export class EventsEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	when: Date;

	@ManyToOne(() => UserEntity, (user) => user.hosts, {
		nullable: false
	})
	@JoinColumn({
		name: 'host_id'
	})
	host: UserEntity;

	@OneToMany(() => AttendeeEntity, (attendee) => attendee.event, {
		cascade: true
	})
	attendees: AttendeeEntity[]
}