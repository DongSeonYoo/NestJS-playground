import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendeeEntity } from "./attendee.entity";
import { UserEntity } from "src/apis/users/users.entity";
import { Expose } from "class-transformer";

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
		nullable: false,
	})
	@JoinColumn({
		name: 'host_id'
	})
	host: UserEntity;

	@OneToMany(() => AttendeeEntity, (attendee) => attendee.event, {
		cascade: true
	})
	attendees: AttendeeEntity[]

	// 가상 열 프로퍼티 (데이터베이스에 저장하지 않음)
	attendeeCount?: number;
}