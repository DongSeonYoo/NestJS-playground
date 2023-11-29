import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AttendeeEntity } from "src/apis/events/entities/attendee.entity";
import { EventsEntity } from "src/apis/events/entities/events.entity";
import { PostsEntity } from "src/apis/posts/posts.entity";
import { UserEntity } from "src/apis/users/users.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'dongseon',
	password: 'dongseon',
	database: 'passport_test_db',
	// entities: [__dirname + '../**/*.entity.{js,ts}'],
	entities: [UserEntity, PostsEntity, EventsEntity, AttendeeEntity],
	synchronize: true,
	// logging: true
}
