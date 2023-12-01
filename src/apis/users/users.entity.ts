import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseEntity } from "../../common/entities/base.entity";
import { PostsEntity } from "../posts/posts.entity";
import { EventsEntity } from "../events/entities/events.entity";
import { AttendeeEntity } from "../attendee/entities/attendee.entity";

@Entity({
	name: 'user_tb'
})
export class UserEntity extends BaseEntity {
	@Column({
		unique: true,
		nullable: false
	})
	email: string;

	@Column({
		nullable: false
	})
	name: string;

	@Column({
		nullable: false
	})
	@Exclude({
		toPlainOnly: true
	})
	password: string;

	@OneToMany(() => EventsEntity, (event) => event.host)
	@Exclude({
		toPlainOnly: true
	})
	hosts: EventsEntity[];

	@OneToMany(() => AttendeeEntity, (attendee) => attendee.user)
	attendees: AttendeeEntity[];

	@OneToMany(() => PostsEntity, (posts) => posts.author)
	posts: PostsEntity[];
}
