import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/users/users.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'dongseon',
	password: 'dongseon',
	database: 'passport_test_db',
	// entities: [__dirname + '../**/*.entity.{js,ts}'],
	entities: [UserEntity],
	synchronize: true
}
